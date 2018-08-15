import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class TroyTest extends Component
{
  constructor(props)
  {
    super(props);

    this.state = { text: "Troy's Text Stuffies" };
  }

  render()
  {
    return (
      <View>
        <Text>{this.state.text}</Text>
      </View>
    );
  }
}
/*
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class HelloWorldApp extends Component {
  render() {
    return (
      <View>
        <Text>Hello world!</Text>
      </View>
    );
  }
}
*/
