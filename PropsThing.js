import React from 'react';

import {Text} from 'react-native';

export default class PropsThing extends React.Component
{
  render()
  {
    if(this.props.condition)
      return (
        <Text>The value is true!</Text>
      );
    else
      return (
        <Text>The value is false :(</Text>
      );
  }
}
