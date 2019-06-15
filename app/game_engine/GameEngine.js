import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { GameLoop } from 'react-native-game-engine';

import MenuStart from '../flappy_falcon/menus/MenuStart';
import MenuLoss from '../flappy_falcon/menus/MenuLoss';

import Timer from './Timer';

export default class GameEngine extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {bestScore: 0, menu: 1};

    this.handlePress = this.handlePress.bind(this); // Makes the 'this' in the tick function always refer to this class, and is more efficient than doing '() => this.tick()' in the render function
    this.tick = this.tick.bind(this);

    this._objects = [];

    this._objectsToRemove = [];
    this._objectsToAdd = [];
  }

  componentWillMount()
  {
    this.score = 0;

    this._timer = new Timer(60);
    this._timer.subscribe(() => () => this.forceUpdate());

    if(this.props.onLoad)
      this.props.onLoad(this);

    this.objects.forEach(o => o ? o.init(this) : undefined);

    this._timer.start();
  }

  componentDidMount()
  {
    this.loadData();
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
    this.tick();

    return(
      <GameLoop GameLoop style={{flex: 1, backgroundColor: 'white'}} onUpdate={this.tick}>
        {/* { this.createScene() } */}
        <View style={{position: 'absolute', top: 50, left: 50, backgroundColor: 'red'}} />
      </GameLoop>
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
        { this.menu === 2 ? <MenuLoss okPress={
          () =>
          {
            this.menu = 1;
            this.score = 0;
            this.objects.length = 0; // clears an array
            
            this.props.onLoad(this);
          }
        } score={this.score} bestScore={this.state.bestScore} /> : undefined }
      </View>
    );
  }

  endGame()
  {
    if(this.score > this.bestScore)
    {
      this.bestScore = this.score;
      this.save();
    }

    this.menu = 2;
  }

  save()
  {
    AsyncStorage.setItem('FlappyFalcon@bestScore', this.bestScore + '');
  }

  async loadData()
  {
    await AsyncStorage.getItem('FlappyFalcon@bestScore').then(data =>
    {
      if(data !== null)
        this.setState(prev => {return {bestScore: data, menu: prev.menu}});
      else
      {
        this.setState(prev => {return {bestScore: 0, menu: prev.menu}});
        this.save();
      }
    });
  }

  scorePoint()
  {
    this.score++;
  }

  get timer() { return this._timer; }
  get objects() { return this._objects; }
  get isMenuShowing() { return this.menu !== 0; }
  get menu() { return this.state.menu; }
  set menu(m) { this.setState(prev => {return {bestScore: prev.bestScore, menu: m}}); }
}
