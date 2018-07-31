import React from 'react';

import {Text} from 'react-native';

export default class StateChanger extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      color: this.props.c1
    };

    setInterval(() =>
    {
      this.setState((prevState) =>
      {
        if(prevState.color == this.props.c1)
          return {
            color: this.props.c2
          };
        else
          return {
            color: this.props.c1
          };
      });
    }, 1000);
  }

  render()
  {
    return (
      <Text style={{color: this.state.color}}>Hello World!</Text>
    );
  }
}
