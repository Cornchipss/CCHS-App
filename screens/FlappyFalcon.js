import React, { Component } from 'react';
import { View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Canvas from 'react-native-canvas';

import { CustomHeader } from '../components/Components';

import GameHandler from '../flappy_falcon/GameHandler';
import PlayingGameState from '../flappy_falcon/states/PlayingGameState';

const FPS = 30;

export default class FlappyFalcon extends Component
{
  constructor(props)
  {
    super(props);

    this.state =
    {
      handler: undefined,
      ctx: undefined
    }
  }

  componentDidMount()
  {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
    this.renderGame();
    setInterval(() => this.update(), FPS / 1000.0);
  }

  renderGame()
  {
    requestAnimationFrame(() => this.renderGame());

    if(this.state.ctx)
    {
      this.state.handler.render(this.state.ctx);
    }
  }

  update()
  {
    if(this.state.handler)
    {
      this.state.handler.tick();
    }
  }

  componentWillUnmount()
  {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.ALL);
  }

  handleCanvas(canvas)
  {
    if(canvas !== null)
    {
      canvas.width = Dimensions.get('window').width;
      canvas.height = Dimensions.get('window').height;

      let handler = new GameHandler();
      handler.state = new PlayingGameState(handler);
      handler.state.init(canvas);

      const ctx = canvas.getContext('2d');

      if(this.state.ctx === undefined)
      {
        this.setState(prev =>
        {
          return {
            handler: handler,
            ctx: ctx
          }
        });
      }
    }
  }

  touch()
  {
    this.state.handler.touch();
  }

  render()
  {
    return (
      <View style={{flex: 1}}>
        <CustomHeader navigation={this.props.navigation} />
        <TouchableWithoutFeedback onPressIn={() => this.touch()}>
          <View>
            <Canvas ref={canvas => this.handleCanvas(canvas)}/>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
