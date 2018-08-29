import React from 'react';

import GameObject from './GameObject';
import Sprite from '../sprites/Sprite';
import { Image } from 'react-native';
// import Type from './Type';

const MAX_SPEED = 2;

export default class Falcon extends GameObject
{
  constructor(props)
  {
    super(props);

    // this.sprite = new Sprite('falcon-0', this.width, this.height);
    //
    this.state =
    {
      image: 0,
      images: [require('../sprites/images/falcon-0.png'), require('../sprites/images/falcon-1.png'), require('../sprites/images/falcon-2.png')]
    }

    this._velocity = 0;
  }

  render()
  {
    return (
      <Image source={this.state.images[this.state.image]} />
    )
  }

  tick(objects)
  {
    if(this._velocity > -MAX_SPEED)
      this._velocity -= 1;

    for(let i = 0; i < objects.length; i++)
    {
      const obj = objects[i];
      if(obj !== this)
      {
        if(this.collidingWith(obj))
        {
          this.die();
        }
      }
    }

    this.y -= this.velocity;
  }

  die()
  {
    console.log('ded');
  }

  touch()
  {
    this._velocity = 10 * MAX_SPEED;
  }

  get velocity() { return this._velocity; }
}
