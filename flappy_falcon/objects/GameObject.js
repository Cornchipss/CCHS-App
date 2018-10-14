import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class GameObject
{
  static currentObjectId = 0;

  constructor(props)
  {
    this.props = props;
    if(props)
    {
      this.position = this.props.position || [0, 0];
      this.dimensions = this.props.dimensions || [0, 0];
    }

    this._id = GameObject.currentObjectId++;
  }

  render()
  {
    return (
      undefined
    );
  }

  touch(e: Object) {}
  tick(engine: GameEngine) {}
  init(engine: GameEngine) {}

  collidingWith(obj: GameObject)
  {
    if(!obj) return false;
    return this.position[0] + this.dimensions[0] > obj.position[0] && this.position[0] < obj.position[0] + obj.dimensions[0]
        && this.position[1] + this.dimensions[1] > obj.position[1] && this.position[1] < obj.position[1] + obj.dimensions[1];
  }

  get id () { return this._id; }
}
