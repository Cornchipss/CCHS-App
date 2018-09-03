import React from 'react';

import GameObject from './GameObject';
import Sprite from '../sprites/Sprite';
import { Image } from 'react-native';

const ACCEL_SPEED = 10.0;
const DECEL_SPEED = 0.4;
const ANIMATION_SPEED_MS = 50;

export default class Falcon extends GameObject
{
  constructor(props)
  {
    super(props);

    this.sprite =
    {
      image: 0,
      images: [require('../sprites/images/falcon-0.png'), require('../sprites/images/falcon-1.png'), require('../sprites/images/falcon-2.png')]
    }

    this._velocity = 0.0;
    this._rotation = 0;

    this._wingChange = 1;

    this._animation = setInterval(() =>
    {
      let wing = this.sprite.image + this._wingChange;
      if(wing >= this.sprite.images.length)
      {
        this._wingChange = -1;
        wing = this.sprite.images.length - 2;
      }
      else if(wing < 0)
      {
        this._wingChange = 1;
        wing = 1;
      }

      this.sprite.image = wing;
    }, ANIMATION_SPEED_MS);
  }

  render()
  {
    return (
      <Image source={this.sprite.images[this.sprite.image]} />
    )
  }

  tick(objects)
  {
    this._velocity -= DECEL_SPEED;

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

    this.props.position.y -= this.velocity;
  }

  die()
  {
    console.log('ded');
  }

  onRemove()
  {
    clearInterval(this._animation);
  }

  touch()
  {
    this._velocity = ACCEL_SPEED;

    this._rotation = 350;
  }

  get velocity() { return this._velocity; }
}
