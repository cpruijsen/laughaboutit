import React, { Component, } from 'react'
import { View, 
  StyleSheet,
  Navigator,
  Text,
  TouchableHighlight,
  Image} from 'react-native'
import api from './../Utils/api';
import _ from 'underscore';
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
  },
  topAlign: {
    position: 'absolute',
    top: 10,
  },
  bottomAlign: {
    position: 'absolute',
    bottom: 10,
  },
  text: {
    fontSize: 20
  },
   button: {  // TODO: change alignment.
    width: 300,
    marginLeft: 50,
    marginBottom: 7,
    backgroundColor: 'white',
    borderColor: 'blue', 
    borderWidth: 0.5
  }
});

class Home extends Component {
  // NOTE: this.props.user === userId
  constructor(props) {
    super(props)
    this.state = {
      bottomCaptionKey: 0,
      topCaptionKey: 0,
//       captionsKey: 0, // NOTE: for testing only
      fontFamily: ['Karla-Bold'],
      topCaptions: [],
      bottomCaptions: [],
      likes: [],
      image: null,
      captionIndex: 0, // loops through topCaptions, bottomCaptions, likes
      noMoreCaptions: false // only true if fetched and no more pics.
    }
  }
  
  fetchCaptions() {
    // fetch the raw image of the day
    var that = this;
    // only change state if image fetch successful
    fetch('https://shielded-springs-75726.herokuapp.com/photos/giveusthisday').then( (data) => {
      return data.json();
    }).then( (res) => {
      console.log('success getDailyRawImage', res);
      that.setState({image: res.url}); 
    }); // TODO: call this from api.getDailyRawImage() --> issue with promises.
    
    // fetch all the captions (top-bottom) and likes in sorted order (server side sorting)
    // only change state if caption fetch successful. Create arrays for each prop.
     fetch('https://shielded-springs-75726.herokuapp.com/captions/giveusthisday').then( (data) => {
      return data.json();
     }).then( (res) => {
      console.log('success getDailyCaptions', res);
      // returns an array of objects [{caption1}, {caption2}, {caption3}] 
      if (res) { 
        var bottomCaptions = _.map(res, function(caption) {
          return caption.caption_bottom;
        });
        var topCaptions = _.map(res, function(caption) {
          return caption.caption_top;
        });
        var likes = _.map(res, function(caption) {
          return caption.likes;   // I don't think we need 'dislikes'
        });
        var fontFamily = _.map(res, function(caption) {
          if (caption.font) {
            return caption.font.slice(1, caption.font.length-1);
          } else {
            return caption.font;
          }
          
        });

        that.setState({topCaptions: topCaptions});
        that.setState({bottomCaptions: bottomCaptions});
        that.setState({likes: likes});
        that.setState({fontFamily: fontFamily});
        that.setState({noMoreCaptions: false});
      }
     }); // TODO: call this from api.getDailyRawImage() --> issue with promises.
  }
  
  fontStyle(captionType) { // TODO: on each caption swap // next image we need to increment topCaptionKey && bottomCaptionKey
    return { // so that a re-render is forced.
      fontSize: 20,
      width: 300,
      height: 20,
      textAlign: 'center',
      backgroundColor: 'rgba(0,0,0,0)',
      color: 'white',
      fontFamily: this.state.fontFamily[this.state.captionIndex] || 'Karla-Bold' 
    };
  }

  componentWillMount() {
    // only fetch images if we haven't done so before
    if (!this.state.image || this.state.topCaptions.length < 1) {
      this.fetchCaptions();
    } 
  }
  componentDidMount() {
    // if we have images and the next image to be served would not be existent, we instead serve the 'noMoreImages' component.
    if (this.state.topCaptions && this.state.captionIndex === this.state.topCaptions.length) {
      this.setState({noMoreCaptions: true}); 
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        
        <Image style={styles.image} source={{uri: this.state.image || 'https://s3-us-west-1.amazonaws.com/labitapp/dog1.jpeg'}}> 
          <View style={styles.topAlign}>
           <Text key={this.state.topCaptionKey} style={this.fontStyle()}>{this.state.topCaptions[this.state.captionIndex] || 'no top'}</Text>
          </View>
          <View style={styles.bottomAlign}>
            <Text key={this.state.bottomCaptionKey} style={this.fontStyle()}>{this.state.bottomCaptions[this.state.captionIndex] || 'no bottom'}</Text>
          </View>
        </Image> 
        <Text style={styles.text}>{this.state.likes[this.state.captionIndex] || 'no votes --> 0'} </Text> 
        
        {this.state.noMoreImages ? <NoMoreCards/> : <Text></Text>}
        
      </View>
    )
  }
}

export default Home