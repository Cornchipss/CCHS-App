import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';

import { CustomHeader } from '../components/Components';

import Falcon from '../flappy_falcon/objects/Falcon';
import Ground from '../flappy_falcon/objects/Ground';
import Pipe from '../flappy_falcon/objects/Pipe';

import GameEngine from '../game_engine/GameEngine';

export default class FlappyFalcon extends Component
{
  constructor(props)
  {
    super(props);
  }

  componentWillMount()
  {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
  }

  componentWillUnmount()
  {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.ALL);
  }

  render()
  {
    const screen = Dimensions.get('window');

    return(
      <View style={{flex: 1}}>
        <CustomHeader />
        <GameEngine
        onLoad=
        {(engine) =>
        {
          engine.objects.push(new Falcon({position: [20, 20], dimensions: [50, 50]}));
          engine.objects.push(new Ground({position: [0, screen.height - 120], dimensions: [screen.width, 120]}));

          const DIST_BETWEEN_PIPES = 200;

          for(let i = 0; i < screen.width / DIST_BETWEEN_PIPES; i++)
          {
            engine.objects.push(new Pipe({position: [screen.width + i * DIST_BETWEEN_PIPES, 0], dimensions: [50, screen.height]}));
          }
        }}
        />
      </View>
    );
  }
}
