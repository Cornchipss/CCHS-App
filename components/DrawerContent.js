import React, { Component } from 'react';
import { ScrollView, SafeAreaView, Image, StyleSheet, View } from 'react-native';
import { DrawerItems } from 'react-navigation';

export default class DrawerContent extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return(
      <ScrollView>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={styles.imageArea}>
            <Image source={require('../assets/images/cchs_logo_nav.png')} style={styles.imageIcon}/>
          </View>
          <DrawerItems {...this.props} />
        </SafeAreaView>
      </ScrollView>
    )
  }
}

const iconDimensions = 150;
const topPartHeight = 200;
const padding = topPartHeight / 2 - iconDimensions / 2;

const styles = StyleSheet.create(
{
  imageArea:
  {
    height: topPartHeight,
    alignItems: 'center',
    paddingTop: padding + 10,
    paddingBottom: padding - 10, // + 10 and - 10 give it a bit of room for the bar at the top of the screen, and since their net value is 0, it won't skew the padding
    backgroundColor: '#002366'
  },
  imageIcon:
  {
    height: iconDimensions,
    borderRadius: iconDimensions / 2, // A border radius of half the width & height makes it into a circle
    width: iconDimensions
  }
});
