import React from 'react';

import { View, Dimensions } from 'react-native';

import GameObject from './GameObject';

const GAP = 120;

export default class Pipe extends GameObject
{
  constructor(props)
  {
    super(props);

    this.speed = 2;
    this.startX = this.position[0];
    this.init();
  }

  init()
  {
    this.safeZone = Math.round((Math.random() * (this.dimensions[1] - 250 - GAP)));
  }

  tick(engine)
  {
    this.position[0] -= this.speed;

    if(this.position[0] + this.dimensions[0] < 0)
    {
      this.position[0] = Dimensions.get('window').width + this.dimensions[0];
      this.init();
    }
  }

  render()
  {
    return (
      <View style={{flex: 1}}>
        <View style={{backgroundColor: 'green', width: this.dimensions[0], height: this.safeZone}} />
        <View style={{backgroundColor: 'green', marginTop: GAP, width: this.dimensions[0], height: this.dimensions[1] - (this.safeZone + GAP)}} />
      </View>
    );
  }
}
