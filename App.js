import React from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity, Text, View } from 'react-native';

export default class App extends React.Component {
  onPressBtn()
  {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <ScrollView>
          <TouchableOpacity  style={styles.imageButton} onPress={this.onPressBtn}>
            <Image style={styles.imageButtonImage} source={require("./assets/2.jpeg")}/>
          </TouchableOpacity >
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageButton: {
    backgroundColor: '#004488',
    borderRadius: 5,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
  imageButtonImage: {
    borderRadius: 5,
  }
});
