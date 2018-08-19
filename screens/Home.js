import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Header, Text, Tile } from 'react-native-elements'; // https://react-native-training.github.io/react-native-elements/docs/overview.html
import { DrawerActions } from 'react-navigation';

import { ImageSlider, Title, CustomHeader } from '../components/Components';

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
        <CustomHeader />
        <View style={{flex: 1, display: 'flex', backgroundColor: 'white'}}>
          <Title />
          <View style={styles.contentBox}>
            <Text style={styles.contentTitle}>Announcements</Text>
            <Text>Oh my something intense happened!</Text>
          </View>
          <ImageSlider style={{flex: 1}}
          images={[require('../assets/images/2.jpeg'),
                  require('../assets/images/asdf2.jpg'),
                  require('../assets/images/asdf.jpg')]} />
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