import React from 'react';

import {Text, View, StyleSheet} from 'react-native';

export default class Styled extends React.Component
{
  render()
  {
    return (
      <View style={styles.container}>
        <Text style={styles.bigBoy}>Big Boy</Text>
        <Text style={styles.normalBoy}>Normal Boy</Text>
        <Text style={styles.lilBoy}>Lil Boy</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      alignItems: 'center'
    },
    bigBoy: {
      fontSize: 24
    },
    normalBoy: {
      fontSize: 16
    },
    lilBoy: {
      fontSize: 12
    }
  }
);
