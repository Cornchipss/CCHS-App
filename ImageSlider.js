import React, { Component } from 'react';
import { View, ImageBackground, Button, StyleSheet } from 'react-native';

export default class ImageSlider extends Component
{
  constructor(props)
  {
    super(props);

    console.log(this.props.images);

    this.nextImage = this.nextImage.bind(this);
    this.previousImage = this.previousImage.bind(this);
    this.updateImage = this.updateImage.bind(this);
    this.updateState = this.updateState.bind(this);

    this.state = {
      images: this.props.images,
      currentImage: this.props.images[0],
      i: 0
    };

    console.log(this.state.images[0]);

    console.log(this.state)
    console.log('i: ' + this.state.i)
  }

  nextImage()
  {
    let i = this.state.i + 1;
    if(i === this.state.images.length)
      i = 0;

    this.updateImage(i);
  }

  previousImage()
  {
    let i = this.state.i - 1;
    if(i < 0)
      i = this.state.images.length - 1;

    this.updateImage(i);
  }

  updateImage(i)
  {
    this.updateState(this.state.images, this.state.images[i], i);
  }

  updateState(images, currentImage, i)
  {
    this.setState(prev =>
    {
      return {
        images: images,
        currentImage: currentImage,
        i: i
      };
    });
  }

  render()
  {
    // Returns the JSX code to be rendered
    return (
      <View style={styles.imageContainer, this.props.style}>
        <ImageBackground style={styles.image} source={this.state.currentImage} resizeMode='contain' >
          <View style={styles.btnContainer}>
            <Button title='<' onPress={this.previousImage} style={styles.slideBtn, {alignSelf: 'left'}} />
            <Button title='>' onPress={this.nextImage} style={styles.slideBtn, {alignSelf: 'right'}}/>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center'
  },
  image: {
    flex: 1,
    width: undefined, // Setting these to undefined fits the image to the area of the flex box it is in
    height: undefined
  },
  btnContainer: {
    display: 'flex',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  slideBtn: {
    height: '100%',
    backgroundColor: 'black'
  }
});
