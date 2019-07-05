import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import { DelayNotification } from './app/components/Components';

import HomeScreen from './app/screens/Home'
import EventsScreen from './app/screens/Events'
import FlappyFalconScreen from './app/screens/FlappyFalcon';
import WeatherScreen from './app/screens/Weather';

// Don't forget the 'this.' - https://www.youtube.com/watch?v=M5d7vygUPoQ

// docs: https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
const routeConfigs =
{
  // For each screen you can navigate to, have an entry like this
  Home:
  {
    screen: HomeScreen, // React component to be used
    navigationOptions:
    {
      title: 'Home'
    }
  },
  Weather:
  {
    screen: WeatherScreen,
    navigationOptions:
    {
      title: 'Weather'
    }
  },
  Events:
  {
    screen: EventsScreen,
    navigationOptions:
    {
      title: 'Events'
    }
  },
  FlappyFalcon:
  {
    screen: FlappyFalconScreen,
    navigationOptions:
    {
      title: 'Flappy Falcon'
    }
  }
}

const navigatorConfig =
{
  initialRouteName: 'Home',
  contentOptions: { activeTintColor: '#007fff' },
  contentComponent: DrawerContent
};

import DrawerContent from './app/components/DrawerContent';

const AppNavigator = createDrawerNavigator(routeConfigs, navigatorConfig);
const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component
{
  constructor(props)
  {
    super(props);
  }

  handleNavigationChange(prevState, newState, action)
  {
    // https://reactnavigation.org/docs/en/app-containers.html
    // This method does nothing but state changes are required to be handled
  }

  render()
  {
    return (
      <View style={styles.container}>
        <DelayNotification />
        <AppContainer onNavigationStateChange={this.handleNavigationChange} uriPrefix="/app" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentBox: {
    display: 'flex',
    paddingLeft: 5,
    paddingRight: 5
  },
  contentTitle: {
    fontSize: 24,
    alignSelf: 'center',
    color: '#808080'
  }
});
