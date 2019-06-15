import React from 'react';
import { Image } from 'react-native';

import GameObject from './GameObject';

const originalSpriteSize = 226;

export default class Ground extends GameObject
{
  static get totalGroundMovement() { return 14; }

  constructor(props)
  {
    super(props);

    this.dimensions[0] = this.dimensions[0] + this.calcMaxMovement() * 2;

    console.log(this.colliders);
  }

  tick(objects)
  {
    this.position[0] -= 2;
    if(this.position[0] <= -this.calcMaxMovement())
      this.position[0] = 0; // Using some pixel measurements, this will cause the ground to loop, appearing to always go backwards
  }

  render()
  {
    return (
      <Image style={{flex: 1, width: this.dimensions[0], height: this.dimensions[1]}} resizeMode='stretch' source={require('../sprites/images/ground.png')} />
    );
  }

  calcMaxMovement()
  {
    return Ground.totalGroundMovement * (this.dimensions[0] / originalSpriteSize);
  }
}
