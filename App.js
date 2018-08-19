import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { Header, Text, Tile } from 'react-native-elements'; // docs: https://react-native-training.github.io/react-native-elements/docs/overview.html
import { NavigationActions, createDrawerNavigator, DrawerItems } from 'react-navigation';

import ImageSlider from './components/ImageSlider';
import Title from './components/Title';

import HomeScreen from './screens/Home'
import EventsScreen from './screens/Events'

// Don't forget the 'this.' - https://www.youtube.com/watch?v=M5d7vygUPoQ

// docs: https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
const routeConfigs =
{
  // For each screen you can navigate to, have an entry like this
  Home:
  {
    screen: HomeScreen, // React component to be used
    navigationOptions: {
      title: 'Home'
    }
  },
  Events:
  {
    screen: EventsScreen,
    navigationOptions: {
      title: 'Events'
    }
  }
}

const navigatorConfig =
{
  initialRouteName: 'Home',
  contentOptions: { activeTintColor: '#007fff' },
  contentComponent: DrawerContent
};

import DrawerContent from './components/DrawerContent';

const AppNavigator = createDrawerNavigator(routeConfigs, navigatorConfig);

export default class App extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <View style={styles.container}>
        <AppNavigator />
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
