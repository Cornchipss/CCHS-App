import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, AppState, View } from 'react-native';

export default class Title extends Component
{
  constructor(props)
  {
    super(props);

    this.state = { dynamicText: this.getProperText() };
  }

  orientationChange(e)
  {
    this.setState(prev =>
    {
      return {
        dynamicText: this.getProperText()
      };
    });
  }

  render()
  {
    if(!this.props.subtitle)
    {
      return(
        <View onLayout={(e) => this.orientationChange(e)}>
          <Text style={styles.title}>Cedar Crest {this.state.dynamicText}</Text>
        </View>
      );
    }
    if(this.props.subtitle)
    {
      return(
        <View onLayout={(e) => this.orientationChange(e)}>
          <Text style={styles.title}>Cedar Crest {this.state.dynamicText}</Text>
          <Text style={styles.subtitle}>{this.props.subtitle}</Text>
        </View>
      );
    }
  }

  getProperText()
  {
    return Dimensions.get('window').width < 400 ? 'HS' : 'High School';
  }
}

const styles = StyleSheet.create(
{
  title: {
    fontSize: 32,
    color: '#002366',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 24,
    color: '#004488',
    textAlign: 'center'
  }
});
