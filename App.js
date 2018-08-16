import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Header, Text, Tile } from 'react-native-elements'; // https://react-native-training.github.io/react-native-elements/docs/overview.html

import ImageSlider from './components/ImageSlider';
import Title from './components/Title';

// Don't forget the 'this.' - https://www.youtube.com/watch?v=M5d7vygUPoQ

export default class App extends Component
{
  constructor(props)
  {
    super(props);
  }

  openNavigation()
  {

  }

  navigateToHomepage()
  {

  }

  render()
  {
    return (
      <View style={styles.container}>
        <Header backgroundColor='#002366'
          statusBarProps={{ barStyle: 'light-content', backgroundColor: 'blue' }}
          leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.openNavigation() }}
          centerComponent={{ text: 'CCHS App', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff', onPress: () => this.navigateToHomepage() }}
        />
        <View style={{flex: 1, display: 'flex', backgroundColor: 'white'}}>
          <Title />
          <View style={styles.contentBox}>
            <Text style={styles.contentTitle}>Announcements</Text>
            <Text>Oh my something intense happened!</Text>
          </View>
          <ImageSlider style={{flex: 1}} images={[require('./assets/images/asdf.jpg'), require('./assets/images/asdf2.jpg')]} />
        </View>
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
