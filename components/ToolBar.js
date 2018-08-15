import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ToolBar extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return(
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create(
{
  container: {
    backgroundColor: '#007fff',
    display: 'flex',
    height: 84,
    paddingTop: 20,
    width: '100%',
    justifyContent: 'flex-end'
  },
  title: {
    color: 'white',
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 2,
    marginLeft: 5
  }
});
