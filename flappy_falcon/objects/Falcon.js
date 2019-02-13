import React from 'react';

import GameObject from './GameObject';
import { Image } from 'react-native';

const JUMP_ACCELERATION = 8.0;
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
    this._wingChangeDeltaTime = 0;

    this._dead = false;
  }

  init(engine)
  {
    engine.timer.subscribe(() =>
    {
      if(!engine.isMenuShowing)
      {
        this._wingChangeDeltaTime += 16; // Aprox 16 ms have passed since last update because it runs at 60fps

        if(this._wingChangeDeltaTime >= ANIMATION_SPEED_MS)
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
          this._wingChangeDeltaTime = 0;
        }
      }
    });
  }

  render()
  {
    return (<Image source={this.sprite.images[this.sprite.image]} style={{backgroundColor: 'red'}} />);
  }

  tick(engine)
  {
    if(!this._dead)
    {
      this._velocity -= DECEL_SPEED;

      for(let i = 0; i < engine.objects.length; i++)
      {
        const obj = engine.objects[i];
        if(obj !== this && obj)
        {
          if(this.collidingWith(obj))
          {
            console.log('DEAD');
            this.die();
          }
        }
      }

      this.position[1] -= this.velocity;
    }
    else
    {
      this._velocity = 0;
      engine.menu = 2;
    }
  }

  die()
  {
    console.log('ded');
    this._dead = true;
  }

  touch(e)
  {
    this._velocity = JUMP_ACCELERATION;

    this._rotation = 350;
  }

  get velocity() { return this._velocity; }
}
