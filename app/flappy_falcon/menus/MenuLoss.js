import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Image, ImageBackground, Text } from 'react-native';

const MENU_WIDTH = 226;
const MENU_HEIGHT = 116;

const BTN_WIDTH = 82;
const BTN_HEIGHT = 28;

export default class MenuLoss extends Component
{
  constructor(props)
  {
    super(props);

    this._ratio = 1; // Set in calculateDimensions function
    this._menuDimensions = this.calculateDimensions();
    this._btnDimensions = { width: Math.ceil(BTN_WIDTH * this._ratio), height: Math.ceil(BTN_HEIGHT * this._ratio) }
  }

  render()
  {
    const screen = Dimensions.get('window');

    const thingH = screen.height / 2 + this._btnDimensions.height;

    let medalImage = undefined;

    if(this.props.score >= 40)
      medalImage = require('../sprites/images/medal-platinum.png');
    else if(this.props.score >= 30)
      medalImage = require('../sprites/images/medal-gold.png');
    else if(this.props.score >= 20)
      medalImage = require('../sprites/images/medal-silver.png');
    else if(this.props.score >= 10)
      medalImage = require('../sprites/images/medal-bronze.png');

    // The random numbers present are just pixel measurements taken from the menu image used to line things up

    return (
      <View style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ImageBackground style={[this._menuDimensions, {flexDirection: 'row', justifyContent: 'space-between'}]} source={require('../sprites/images/score-screen.png')}>
          {medalImage ? <Image style={{position: 'absolute', left: this.addRatio(26) , top: this.addRatio(42), width: this.addRatio(44), height: this.addRatio(44)}} source={medalImage} /> : undefined}
          {this.props.score === this.props.bestScore ? <Image style={{position: 'absolute', left: this.addRatio(130), top: this.addRatio(58), width: this.addRatio(32), height: this.addRatio(14)}} source={require('../sprites/images/new.png')} /> : undefined }
          <Text style={{position: 'absolute', left: 0, top: this.addRatio(26), width: this.addRatio(204), fontSize: this.addRatio(24), color: 'white', textAlign: 'right'}}>{this.props.score}</Text>
          <Text style={{position: 'absolute', left: 0, top: this.addRatio(72), width: this.addRatio(204), fontSize: this.addRatio(24), color: 'white', textAlign: 'right'}}>{this.props.bestScore}</Text>
        </ImageBackground>

        <TouchableOpacity onPress={() => this.props.okPress()} style={[{position: 'absolute', left: screen.width / 2 - this._menuDimensions.width / 2, top: thingH}, this._btnDimensions]}>
          <Image style={this._btnDimensions} source={require('../sprites/images/ok-btn.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={[{position: 'absolute', left: screen.width / 2 + this._menuDimensions.width / 2 - this._btnDimensions.width, top: thingH}, this._btnDimensions]}>
          <Image style={this._btnDimensions} source={require('../sprites/images/score-btn.png')} />
        </TouchableOpacity>
      </View>
    )
  }

  calculateDimensions()
  {
    const screen = Dimensions.get('window');
    const percentWidth = 0.8; // % of the screen width as decimal the menu will take up
    this._ratio = (percentWidth * screen.width) / MENU_WIDTH;

    return {
      width: this.addRatio(MENU_WIDTH),
      height: this.addRatio(MENU_HEIGHT)
    };
  }

  addRatio(p) { return Math.ceil(p * this._ratio); }
}
