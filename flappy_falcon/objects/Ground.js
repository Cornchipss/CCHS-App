import { Dimensions } from 'react-native';

import Sprite from '../sprites/Sprite';

import GameObject from './GameObject';

const originalSpriteSize = 226;
const totalGroundMovement = 14;

export default class Ground extends GameObject
{
  constructor(y: int, state: GameState)
  {
    super(0, y, Dimensions.get('window').width + totalGroundMovement * 2, Dimensions.get('window').height - y, state);

    this.sprite = new Sprite('ground', this.width, this.height);
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
    return totalGroundMovement * (this.width / originalSpriteSize);
  }
}
