import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { ImageSlider, Title, CustomHeader } from '../components/Components';

import { styles } from '../util/Styles';

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
        <CustomHeader navigation={this.props.navigation}/>
        <View style={styles.container}>
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
