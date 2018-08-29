import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class GameEngine extends Component
{
  constructor(props)
  {
    super(props);

    this.objectsToRemove = [];
  }

  componentWillMount()
  {
    setInterval(() =>
    {
      this.props.objects.forEach(o =>
      {
        if(o.tick)
          o.tick(this.props.objects, this);
      });

      while(this.objectsToRemove.length !== 0)
      {
        let i = this.props.objects.indexOf(this.objectsToRemove.pop());
        if(i !== -1)
          this.props.objects.splice(i, 1);
      }

      this.forceUpdate();
    }, 60 / 1000.0);
  }

  removeObject(o)
  {
    this.objectsToRemove.push(o);
  }

  touch(e)
  {
    this.props.objects.forEach(o =>
    {
      if(o.touch)
        o.touch(e);
    });
  }

  render()
  {
    return (
      <View style={[{backgroundColor: 'black'}, this.props.style]} onTouchStart={(e) => touch(e)}>
        {
          this.props.objects.map((obj, index) =>
          {
            <View key={obj.id}
            style={{position: 'absolute', left: obj.props.position.x, top: obj.props.position.y,
            width: obj.props.dimensions.width, height: obj.props.dimensions.height}}>
              <Text>HI</Text>
            </View>
          })
        }

        {this.props.children}
      </View>
    );
  }
}

GameEngine.defaultProps =
{
  objects: [],
  tick: () => {},
  style: undefined
};
