import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation'

import { Container, Content, Header, Body, Icon } from 'native-base';

import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';

class App extends Component
{
  render() {
    return (
      <View style={{flex: 1}}>
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
      screen: SettingsScreen
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
