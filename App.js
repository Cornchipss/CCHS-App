import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import Hello from './Hello';
import PropsThing from './PropsThing';
import StateChanger from './StateChanger';
import Styled from './Styled';
import ImageSlider from './ImageSlider';

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
        <View style={styles.header}>
          <Hello />
        </View>
        <View style={styles.middle}>
          <PropsThing condition={true} />
          <StateChanger c1='#000' c2='#048' />
          <Styled />
        </View>
        <View style={{flex: 3, display: "flex", backgroundColor: "blue"}}>
          <View style={{display: "flex", flex: 1, backgroundColor: 'black'}}>
            <ImageSlider style={{flex: 1}} images={[require('./images/asdf.jpg'), require('./images/asdf2.jpg')]} />
          </View>
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
