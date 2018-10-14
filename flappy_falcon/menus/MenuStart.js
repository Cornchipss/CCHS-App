import React, { Component } from 'react';
import { View, Image } from 'react-native';

export default class MenuStart extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <View style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('../sprites/images/tap.png')} />
      </View>
    )
  }
}
