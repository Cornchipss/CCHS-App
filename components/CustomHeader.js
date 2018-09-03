import React, { Component } from 'react';
import { Header } from 'react-native-elements'; // https://react-native-training.github.io/react-native-elements/docs/overview.html

export default class CustomHeader extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <Header style={this.props.style}
        backgroundColor='#002366'
        statusBarProps={{ barStyle: 'light-content', backgroundColor: 'blue' }}
        leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.toggleDrawer() }}
        centerComponent={{ text: 'CCHS App', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff', onPress: () => this.props.navigation.navigate('Home') }}
      />
    );
  }
}
