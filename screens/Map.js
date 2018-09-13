import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';

import { Svg, Image as SvgImage } from 'react-native-svg';

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
          <Title subtitle={'Map'} />
          <Svg width="100%" height="100%">
            <SvgImage
                x="0"
                y="0"
                width="100%"
                height="100%"
                href={require('../assets/images/2.jpeg')}
              />
          </Svg>
        </View>
      </View>
    );
  }
}
