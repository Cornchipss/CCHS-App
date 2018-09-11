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
  }

  tick(objects)
  {
    this.position.x -= 1;
    if(this.position.x <= -this.calcMaxMovement())
      this.position.x = 0; // Using some pixel measurements, this will cause the ground to loop, appearing to always go backwards
  }

  render()
  {
    return (
      <Image style={{flex: 1, width: this.dimensions.width, height: undefined}} resizeMode='stretch' source={require('../sprites/images/ground.png')} />
      // TODO: Calc ratio of scaling (using screenH / width or something similar)
    );
  }

  calcMaxMovement()
  {
    return Ground.totalGroundMovement * (this.dimensions.width / originalSpriteSize);
  }
}
