import React from 'react';

import { View, Dimensions, Image } from 'react-native';

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

    const BIG_NUMBER = 99999;

    this.colliders = [];
    this.colliders.push({ position: [0, -BIG_NUMBER], dimensions: [this.dimensions[0], BIG_NUMBER + this.safeZone] });
    this.colliders.push({ position: [0, this.safeZone + GAP], dimensions: [this.dimensions[0], BIG_NUMBER]});
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
        <Image style={{backgroundColor: "green", width: this.dimensions[0], height: this.safeZone}} source={require("../sprites/images/pipe-down.png")} />
        <Image style={{backgroundColor: "green", marginTop: GAP, width: this.dimensions[0], height: this.dimensions[1] - (this.safeZone + GAP)}} source={require("../sprites/images/pipe-up.png")} />
      </View>
    );
  }

  // collidingWith(obj)
  // {
  //   if(!obj) return false;
  //   if(this.position[0] + this.dimensions[0] > obj.position[0] && this.position[0] < obj.position[0] + obj.dimensions[0])
  //   {
  //     if(obj.position[1] > this.safeZone && obj.position[1] + obj.dimensions[1] < this.safeZone + GAP)
  //       return false;
  //     else
  //       return true;
  //   }

  //   return false;
  // }
}
