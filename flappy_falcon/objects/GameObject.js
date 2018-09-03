import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';

export default class GameObject extends PureComponent
{
  static currentObjectId = 0;

  constructor(props)
  {
    super(props);

    this.id = GameObject.currentObjectId++;
  }

  render()
  {
    return (
      <View style={{backgroundColor: 'blue', left: this.props.position.x, right: this.props.position.y, width: this.props.dimensions.width, height: this.props.dimensions.height}}/>
    );
  }

  touch(e) {}
  tick(objects) {}
  onRemove() {}

  collidingWith(obj: GameObject)
  {
    return (obj.position.x + obj.dimensions.width  > this.position.x && obj.position.x < this.position.x + this.dimensions.width) &&
           (obj.position.y + obj.dimensions.height > this.position.y && obj.position.y < this.position.y + this.dimensions.height);
  }
}
