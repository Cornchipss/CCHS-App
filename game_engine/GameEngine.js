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
    this._tickInterval = setInterval(() =>
    {
      this.props.objects.forEach(o =>
      {
        if(o.tick)
          o.tick(this.props.objects, this);
      });

      while(this.objectsToRemove.length !== 0)
      {
        let obj = this.objectsToRemove.pop();
        obj.onRemove();
        
        let i = this.props.objects.indexOf(obj);
        if(i !== -1)
          this.props.objects.splice(i, 1);
      }

      this.forceUpdate();
    }, 60 / 1000.0);
  }

  componentWillUnmount()
  {
    clearInterval(this._tickInterval);

    this.props.objects.forEach(o =>
    {
      if(o.onRemove)
        o.onRemove();
    });
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
      <View style={[{backgroundColor: 'black'}, this.props.style]} onTouchStart={(e) => this.touch(e)}>
        {
          this.props.objects.map(obj =>
          {
            return (
              <View key={obj.id}
              style={{position: 'absolute', left: obj.props.position.x, top: obj.props.position.y,
              width: obj.props.dimensions.width, height: obj.props.dimensions.height}}>
                {/*<Text style={{color: 'white'}}>HI</Text>*/}
                { obj.render() }
              </View>
            )
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
