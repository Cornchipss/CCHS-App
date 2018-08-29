import React, { Component } from 'react';
import { View, Dimensions, TouchableWithoutFeedback, StatusBar } from 'react-native';

import { CustomHeader } from '../components/Components';

import Falcon from '../flappy_falcon/objects/Falcon';
import Ground from '../flappy_falcon/objects/Ground';

import GameEngine from '../game_engine/GameEngine';

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
      <View style={{flex: 1, display: 'flex'}}>
        <CustomHeader navigation={this.props.navigation} />
        <GameEngine style={{flex: 1}} objects={[
          new Falcon({position: {x: 20, y: 100},
                      dimensions: {width: 34, height: 24}})
        ]}/>
      </View>
    );
  }
}
