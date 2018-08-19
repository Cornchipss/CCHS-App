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
    return(
      <View onLayout={(e) => this.orientationChange(e)}>
        <Text style={styles.title}>Cedar Crest {this.state.dynamicText}</Text>
        {this.props.subtitle ? <Text style={styles.subtitle}>{this.props.subtitle}</Text> : null}
      </View>
    );
  }

  /**
   * Decides whether or not to abbreviate High School based off the window's width
   * @return {string} HS if window width < 400, otherwise High School
   */
  getProperText()
  {
    if(Dimensions.get('window').width < 400)
      return 'HS';
    else
      return 'High School';
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
