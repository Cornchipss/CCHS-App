import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, StatusBar } from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation'

import { Container, Content, Header, Body, Icon } from 'native-base';

import firebase from 'firebase';

import HomeScreen from './HomeScreen';
import CalendarScreen from './CalendarScreen'; // https://www.youtube.com/watch?v=VFRRqfhvejI

class App extends Component
{
  componentWillMount()
  {
    let config = {
      apiKey: "AIzaSyDm3NGvoY-jbd5Et3kczE-GAsjwBzQK5fU",
      authDomain: "cchs-app.firebaseapp.com",
      databaseURL: "https://cchs-app.firebaseio.com",
      projectId: "cchs-app",
      storageBucket: "cchs-app.appspot.com",
      messagingSenderId: "529170559424"
    };
    firebase.initializeApp(config);

    firebase.database().ref('users/003').set(
      {
        name: 'Troy Copeicus',
        age: 16
      }
    ).then(() =>
    {
      console.log('INERSTED');
    }).catch((err) =>
    {
      console.log(err);
    });

    firebase.database().ref('users').once('value', (data) => {
      console.log(data.toJSON());
    });

    // Prints it every time the data is changed
    // firebase.database().ref('users').on('value', (data) => {
    //   console.log(data.toJSON());
    // });
  }

  render()
  {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <PageNavigator />
      </View>
    );
  }
}

const CustomDrawerContentComponent = (props) =>
(
  <Container>
    <Header style={{height: 200}}>
      <Body style={styles.drawerBody}>
        <Image style={styles.drawerImage} source={require('./assets/2.jpeg')} />
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>
  </Container>
);

const PageNavigator = DrawerNavigator({
    Home: {
      screen: HomeScreen
    },
    Settings: {
      screen: CalendarScreen
    }
  },
  {
    initialRouteName: 'Home',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }
);

const styles = StyleSheet.create({
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  drawerBody: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;
