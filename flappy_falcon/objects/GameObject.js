import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';

export default class GameObject
{
  static currentObjectId = 0;

  constructor(props)
  {
    props = props || {};
    this._position = props.position || {x: 0, y: 0}
    this._dimensions = props.dimensions || {width: 0, height: 0}

    this._id = GameObject.currentObjectId++;
  }

  render()
  {
    return (
      <View style={{backgroundColor: 'transparent', left: this.props.position.x, right: this.props.position.y, width: this.props.dimensions.width, height: this.props.dimensions.height}}/>
    );
  }

  touch(e) {}
  tick(objects) {}
  onRemove() {}

  collidingWith(obj: GameObject)
  {
    return obj ?
    (obj.position.x + obj.dimensions.width  > this.position.x && obj.position.x < this.position.x + this.dimensions.width) &&
    (obj.position.y + obj.dimensions.height > this.position.y && obj.position.y < this.position.y + this.dimensions.height) :
    false;
  }

  get position() { return this._position; }
  set position(pos) { this._position = pos; }

  get dimensions() { return this._dimensions; }
  set dimensions(d) { this._dimensions = d; }

  get id () { return this._id; }
}
