import React, { Component, } from 'react'
import { View, 
  StyleSheet,
  Navigator,
  Text,
  Image} from 'react-native'
import api from './../Utils/api';
import NoMoreCards from './Default';

// the main tinder swiping view.

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  image: {
    width: 300,
    height: 200
  }
});

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: null, 
      imageIndex: 0,
      noMoreImages: false // only true if fetched and no more pics.
    }
  }
  
  fetchImages() {
    var images = api.getDailyCaptions();
    console.log(images, 'images fetched on Home');
    if (images) { // only change state if image fetch successful.
      this.setState({images: images});
      this.setState({noMoreImages: false});
    }
  }

  render() {
    // only fetch images if we haven't done so before.
    if (!this.state.images) {
      this.fetchImages();
    } 
    // if we have images and the next image to be served would not be existent, we instead serve the 'noMoreImages' component.
    if (this.state.images && this.state.imageIndex === this.state.images.length) {
      this.setState({noMoreImages: true});
    }
    return (
      <View style={styles.container}>

        {!this.state.noMoreImages && this.state.images ? <Image style={styles.image} source={{uri: this.state.images[this.state.imageIndex] }}/> : 
        <Image style={styles.image} source={{uri: 'https://s3-us-west-1.amazonaws.com/labitapp/dog1.jpeg'}}>
          <Text> No Images Fetched</Text>
        </Image> }
        
        {this.state.noMoreImages ? <NoMoreCards/> : <Text></Text>}
        
      </View>
    )
  }
}

export default Home