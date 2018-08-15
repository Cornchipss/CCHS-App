import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Text } from 'react-native-elements'; // https://react-native-training.github.io/react-native-elements/docs/overview.html

import ImageSlider from './components/ImageSlider';

// Don't forget the "this." - https://www.youtube.com/watch?v=M5d7vygUPoQ

export default class App extends Component
{
  constructor(props)
  {
    super(props);

    this.state = { text: '' };
  }

  render()
  {
    return (
      <View style={styles.container}>
        <Header
          statusBarProps={{ barStyle: 'light-content', backgroundColor: 'blue' }}
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'CCHS App', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <View style={{flex: 1, display: "flex", backgroundColor: "white"}}>
          <ImageSlider style={{flex: 1, display:'flex'}} images={[require('./assets/images/asdf.jpg'), require('./assets/images/asdf2.jpg')]} />
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
  header: {
    flex: 1,
    backgroundColor: '#F00',
    alignItems: 'center',
    justifyContent: 'center'
  },
  middle: {
    flex: 2,
    backgroundColor: '#FFF',
    alignItems: 'center'
  },
  bottom: {
    flex: 3,
    backgroundColor: '#00F',
    paddingLeft: 5,
    display: 'flex',
    flexDirection: 'column'
  }
});
