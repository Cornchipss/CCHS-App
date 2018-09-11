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

  componentWillMount()
  {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);

    let screen = Dimensions.get('window');
    console.log(new Ground({position: {x: 0, y: screen.height - 40},
                dimensions: {width: screen.width + Ground.totalGroundMovement * 2, height: 40}}));

                for(let i = 0; i < 10000; i++) {}
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
    let screen = Dimensions.get('window');

    return (
      <View style={{flex: 1, display: 'flex'}}>
        <CustomHeader navigation={this.props.navigation} />
        <GameEngine style={{flex: 1}} objects={[
          new Falcon({position: {x: 20, y: 100},
                      dimensions: {width: 34, height: 24}}),
          new Ground({position: {x: 0, y: screen.height - 100},
                      dimensions: {width: screen.width + Ground.totalGroundMovement * 2, height: 100}})
        ]}/>
      </View>
    );
  }
}
