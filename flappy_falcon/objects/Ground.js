import { Dimensions } from 'react-native';

import Sprite from '../sprites/Sprite';

import GameObject from './GameObject';

const originalSpriteSize = 226;

export default class Ground extends GameObject
{
  constructor(y: int)
  {
    super(0, y);

    this.totalGroundMovement = 14;
    this._sprite = new Sprite('ground', Dimensions.get('window').width + this.totalGroundMovement * 2, Dimensions.get('window').height - y);
  }

  tick()
  {
    this.x -= 1;
    if(this.x <= -this.calcMaxMovement())
      this.x = 0; // Using some pixel measurements, this will cause the ground to loop, appearing to always go backwards
  }

  render(ctx)
  {
    this.sprite.render(ctx, this.x, this.y);
  }

  calcMaxMovement()
  {
    return this.totalGroundMovement * (this.width / originalSpriteSize);
  }

  get width() { return Dimensions.get('window').width + this.totalGroundMovement; }
}
