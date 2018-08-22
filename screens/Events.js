import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { Header, Text, Tile } from 'react-native-elements'; // https://react-native-training.github.io/react-native-elements/docs/overview.html

import { CustomHeader, Title } from '../components/Components';
import { Event, Calendar, prettyDate } from '../util/Util';

const axios = require('axios'); // For ajax requests

export default class App extends Component
{
  constructor(props)
  {
    super(props);

    this.state =
    {
      calendar: undefined,
      lengthDays: 365
    }
  }

  componentWillMount()
  {
    let start = new Date();
    let end = new Date();
    end.setDate(end.getDate() + this.state.lengthDays);

    pullEvents(start, end, (events) =>
    {
      if(events !== null)
        this.setCalendar(new Calendar(start, end, events));
      else
        throw new IllegalStateException('Error loading events.'); // If the events variable is null, it could not load them for some reason.
    });
  }

  /**
   * Sets the calendar to load the events from
   * @param {Calendar} cal The Calendar to set it to
   */
  setCalendar(cal: Calendar)
  {
    this.setState(prev =>
    {
      return {
        calendar: cal,
        lengthDays: prev.lengthDays
      }
    });
  }

  render()
  {
    return (
      <View style={styles.container}>
        <CustomHeader navigation={this.props.navigation}/>
        <View style={{flex: 1, display: 'flex', backgroundColor: 'white'}}>
          <Title subtitle='Events' />
          { this.state.calendar ? this.renderEvents() : this.renderLoader() }
        </View>
      </View>
    );
  }

  /**
   * Returns the jsx to render all the events that have been loaded in from the calendar present in the state
   * @return {JSX} A View with all the events in it formatted correctly
   */
  renderEvents()
  {
    return (
      <ScrollView style={{flex: 1, display: 'flex'}}>
        <Text style={{alignSelf: 'center'}}>Events Loaded</Text>
        {
          this.state.calendar.events.map((event, index) =>
          (
            <View key={event.title} style={{display: 'flex', height: 200, paddingLeft: 20}}>
              <Text>{event.title}</Text>
              <Text>
                {
                  event.begin.getDate() === event.end.getDate() ?
                  prettyDate(event.begin) :
                  prettyDate(event.begin) + ' - ' + prettyDate(event.end)
                }
              </Text>
              <Text>{event.category}</Text>
            </View>
          ))
        }
      </ScrollView>
    );
  }

  /**
   * Returns the jsx to render a loader
   * @return {JSX} An ActivityIndicator in a View
   */
  renderLoader()
  {
    return (
      <View style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={"large"} color={"#002366"} />
      </View>
    );
  }
}

const styles = StyleSheet.create(
{
  container:
  {
    display: 'flex',
    flex: 1
  }
});

/**
 * Pulls the events from the school's database, puts them into an array of Event objects, and calls the handleEvents function with the argument of an array of event objects
 * @param  {Date} start        The date to start the search on
 * @param  {Date} end          The date to end the search on
 * @param  {Function} handleEvents What to do with an array of events parsed from the school's api
 */
function pullEvents(start: Date, end: Date, handleEvents: Function)
{
  // This is how the school data likes to be formatted. Don't touch this please. Unless something breaks. If something breaks, check out the docs on if something breaks:
  /*
   * += Docs if Something Breaks =+
   * 1) Don't panic
   * 2) Go here: view-source:https://www.clsd.k12.pa.us/Page/2#calendar1/20180817/month
   * 3a) If this doesn't give you a 404 error, then continue, otherwise go to step 3b
   * 4a) Get to around line 6334 and there should be a bunch of code that looks like type: "POST", url: "blah", data: "blah".
   * 5a) The data is the important part. Copy that, and paste that into this data variable. If it doesn't work, they may have changed some urls so copy some text over and see what you need to slap in there.
   * 6a) If nothing works, hit me up on discord
   *
   * 3b) If this page gives you a 404, they really changed their site didn't they :/
   * 4b) Look for their calendar page
   * 5b) Once you're there view page source
   * 6b) Look for the line that has type: "POST". It should be near something that says ajax, and has a url near it too.
   *  * If there is no "POST", look for something that says eval(result.d). It should be around there.
   * 7b) Look at how they have that area put together, and make modifications to the code you see here.
   */
  const data =
    "{ModuleInstanceID: 1, " +
    "StartDate: '" + (parseInt(start.getMonth()) + 1) + "/" + start.getDate() + "/" + start.getFullYear() +  "', " +
    "EndDate: '" + (parseInt(end.getMonth()) + 1) + "/" + end.getDate() + "/" + end.getFullYear() + "'}";

  // This is the only lib that works. The stupid school's api is so stupid.
  axios(
  {
    method: 'POST',
    url: 'https://www.clsd.k12.pa.us/site/UserControls/Calendar/CalendarController.aspx/GetEvents',
    data: data,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  }).then((result) =>
  {
    // Don't ever do this. Don't. It runs code from a string and returns its result, without any regard for security vulnerabilities.
    // Sadly, the school decided to use it (actually a less efficient version (eval)) in their code anyway, so I have to :(.
    const eventsJSON = Function('return ' + JSON.parse(result.request._response).d)();

    let events = [];

    // Puts all the school events json into a nice array of nice event
    for(let i = 0; i < eventsJSON.length; i++)
    {
      events.push(new Event(new Date(eventsJSON[i].start), new Date(eventsJSON[i].end),
                            eventsJSON[i].title, Event.getCategory(eventsJSON[i].CategoryColor)));
    }

    handleEvents(events);
  }).catch(err =>
  {
    console.log('ERROR PARSING EVENTS!');
    console.log(err);

    handleEvents(null);
  });
}
