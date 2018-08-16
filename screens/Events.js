import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Header, Text, Tile } from 'react-native-elements'; // https://react-native-training.github.io/react-native-elements/docs/overview.html
import { DrawerActions } from 'react-navigation';

import ImageSlider from '../components/ImageSlider';
import Title from '../components/Title';

export default class App extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <Header backgroundColor='#002366'
          statusBarProps={{ barStyle: 'light-content', backgroundColor: 'blue' }}
          leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.toggleDrawer() }}
          centerComponent={{ text: 'CCHS App', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff', onPress: () => this.props.navigation.navigate('Home') }}
        />
        <View style={{flex: 1, display: 'flex', backgroundColor: 'white'}}>
          <Title subtitle='Events' />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { display: 'flex', flex: 1 }
});
