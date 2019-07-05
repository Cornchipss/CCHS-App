import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';

import { getLocation, getDay } from '../util/Util';
 
import { CustomHeader, Title } from '../components/Components';

import { styles } from '../util/Styles';
import { Card } from 'react-native-elements';

const axios = require('axios'); // For ajax requests

const WEATHER_API_KEY = 'b0d48880090d49e9dcc76306507a83b6';

// This cannot be done w/ some sort of loop because the require function is run at compile time, not runtime.
const WEATHER_ICONS = 
{
    'clear-day': require('../assets/images/weather/clear-day.jpg'), 
    'clear-night': require('../assets/images/weather/clear-night.jpg'), 
    'cloudy': require('../assets/images/weather/cloudy.jpg'), 
    'snow': require('../assets/images/weather/snow.jpg'), 
    'sleet': require('../assets/images/weather/sleet.jpg'), 
    'wind': require('../assets/images/weather/wind.jpg'), 
    'fog': require('../assets/images/weather/fog.jpg'), 
    'cloudy': require('../assets/images/weather/cloudy.jpg'), 
    'partly-cloudy-day': require('../assets/images/weather/partly-cloudy-day.jpg'),
    'partly-cloudy-night': require('../assets/images/weather/partly-cloudy-night.jpg'),
};

/*
icon optional
A machine-readable text summary of this data point, suitable for selecting an icon for display. 
If defined, this property will have one of the following values: 
clear-day, clear-night, , snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night. 
rain
(Developers should ensure that a sensible default is defined, as additional values, such as hail, thunderstorm, or tornado, 
    may be defined in the future.)
*/
export default class Weather extends Component
{
    constructor(props)
    {
        super(props);
    
        this.state =
        {
            location: undefined
        };
    }

    getWeather(location)
    {
        return new Promise((resolve, reject) =>
        {
            axios({url: `https://api.darksky.net/forecast/${WEATHER_API_KEY}/${location.latitude},${location.longitude}`, method: 'GET', cache: false})
                .then(res =>
                {
                    resolve(JSON.parse(res.request._response));
                })
                .catch(err =>
                {
                    reject(err);
                });
        });
    }

    error(err)
    {
        console.log(err);
    }
    
    componentWillMount()
    {
        getLocation()
            .then(res =>
            {
                this.setState(prev =>
                    {
                        prev.location = res;
                        return prev;
                    });

                this.getWeather(res)
                    .then(res =>
                    {
                        this.setState(prev =>
                            {
                                prev.weather = res;
                                return prev;
                            });
                    })
                    .catch(ex => error(ex));
            })
            .catch(ex => this.error(ex));
    }

    drawWeather()
    {
        let current = this.state.weather.currently;

        console.log(current);

        return (
            <View style={styles.container}>
                <View key={'currently'} style={{display: 'flex'}}>
                    <Card title={`${getDay(new Date())}'s Weather`} titleStyle={weatherStyles.titleFont} style={{flexDirection: 'column', display: 'flex'}} image={WEATHER_ICONS[current.icon]}>
                        <View style={{flexDirection: 'column', flex: 1}}>
                            <View style={weatherStyles.infoContainer}>
                                <Text style={weatherStyles.currentText}>{~~Math.round(current.temperature)}°F</Text>
                                <View style={{alignContent: 'flex-end', flex: 1}}>
                                    <Text style={[weatherStyles.currentText, {textAlign: 'right'}]}>{~~(Math.round(current.humidity * 100))}% Humidity</Text>
                                </View>
                            </View>

                            <View style={weatherStyles.infoContainer}>
                                <Text style={[weatherStyles.currentText, {flex: 1, textAlign: 'center'}]}>{~~Math.round(current.windSpeed)} mph wind speeds</Text>
                            </View>

                            <View style={weatherStyles.infoContainer}>
                                <Text style={[weatherStyles.currentText, {flex: 1, textAlign: 'center'}]}>{~~(Math.round(current.precipProbability * 100))}% Precip. Chance</Text>
                            </View>

                            <View style={[weatherStyles.infoContainer, {paddingTop: 10}]}>
                                <Text style={[weatherStyles.currentText, {textAlign: 'center', flex: 1}]}>{current.summary}</Text>
                            </View>
                        </View>
                    </Card>
                </View>
                {
                    this.state.weather.hourly.data.map((hour, i) =>
                    (
                        <View key={hour.time}>
                            <Text>{hour.temperature}°F</Text>
                        </View>
                    ))
                }
            </View>
        );
    }

    render()
    {
        return (
            <View style={styles.container}>
                <CustomHeader navigation={this.props.navigation}/>
                <View style={styles.container}>
                    <Title subtitle={(this.state.location ? this.state.location.city + ' ' : '') + 'Weather'} />

                    <ScrollView style={{display: 'flex', padding: 10}}>
                        {this.state.weather ? this.drawWeather() : <ActivityIndicator size="large" color="#004488" />}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const weatherStyles = StyleSheet.create(
{
    titleFont:
    {
        fontSize: 28
    },
    currentText:
    {
        fontSize: 24
    },
    
    infoContainer:
    {
        flexDirection: 'row',
        flex: 1
    },
    temperature:
    {
        fontSize: 16
    }
});