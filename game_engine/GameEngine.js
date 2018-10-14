import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

import MenuStart from '../flappy_falcon/menus/MenuStart';
import MenuLoss from '../flappy_falcon/menus/MenuLoss';

import Timer from './Timer';

export default class GameEngine extends Component
{
  constructor(props)
  {
    super(props);

    this.handlePress = this.handlePress.bind(this); // Makes the 'this' in the tick function always refer to this class, and is more efficient than doing '() => this.tick()' in the render function

    this._objects = this.props.objects || [];

    this._objectsToRemove = [];
    this._objectsToAdd = [];

    this._menuShowing = 2;
  }

  componentWillMount()
  {
    this._timer = new Timer(60);
    this._timer.subscribe(() => this.tick());

    if(this.props.onLoad)
      this.props.onLoad(this);

    this.objects.forEach(o => o ? o.init(this) : undefined);

    this._timer.start();
  }

  componentWillUnmount()
  {
    this._timer.stop();
  }

  tick()
  {
    if(!this.isMenuShowing)
    {
      this.objects.forEach(o =>
      {
        if(o)
          o.tick(this);
      });

      // You can't modify an array while it's being foreach'd, so just remove the qued objects afterwards
      while(this._objectsToAdd.length !== 0)
      {
        this.objects.push(this._objectsToAdd.pop());
      }

      while(this._objectsToRemove.length !== 0)
      {
        let o = this._objectsToRemove.pop();

        for(let i = 0; i < this.objects.length; i++)
        {
          if(this.objects[i].id === o.id)
          {
            this.objects.splice(i);
            return;
          }
        }
      }

      this.forceUpdate(); // Makes react rerender the components
    }
  }

  removeObject(o)
  {
    for(let i = 0; i < this.objects.length; i++)
    {
      if(this.objects[i].id === o.id)
        return;
    }
    this._objectsToRemove.push(o);
  }

  addObject(o)
  {
    for(let i = 0; i < this.objects.length; i++)
    {
      if(this.objects[i].id === o.id)
        return;
    }

    this._objectsToAdd.push(o);
  }

  handlePress(e)
  {
    if(this.menu === 1)
      this.menu = 0;

    this.objects.forEach(o =>
    {
      if(o)
        o.touch(e);
    });
  }

  render()
  {
    return(
      <TouchableWithoutFeedback onPressIn={this.handlePress} style={{flex: 1, display: 'flex'}}>
        <View style={{flex: 1, display: 'flex'}}>
          { this.createScene() }
        </View>
      </TouchableWithoutFeedback>
    );
  }

  createScene()
  {
    return (
      <View style={{flex: 1, display: 'flex'}}>
        {
          this.objects.map((obj, index) =>
          (
            obj.position ?
              <View key={obj.id} style={{position: 'absolute', left: obj.position[0], top: obj.position[1], width: obj.dimensions[0], height: obj.dimensions[1]}}>
                {obj.render()}
              </View>
              :
              undefined
          ))
        }
        { this.menu === 1 ? <MenuStart /> : undefined }
        { this.menu === 2 ? <MenuLoss /> : undefined }
      </View>
    );
  }

  get timer() { return this._timer; }
  get objects() { return this._objects; }
  get isMenuShowing() { return this.menu !== 0; }
  get menu() { return this._menuShowing; }
  set menu(m) { this._menuShowing = m; }
}
