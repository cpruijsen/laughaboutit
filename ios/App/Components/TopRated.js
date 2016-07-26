import React, { Component, } from 'react';
import { View, Image, Text, TouchableHighlight, StyleSheet, ScrollView } from 'react-native';
import api from './../Utils/api';
import _ from 'underscore'; 
// scrollView: https://facebook.github.io/react-native/docs/scrollview.html

// NOTE: this component needs polish - done last-minute.

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
  },
  image: {
    width: 300,
    height: 200
  }, 
  topAlign: { // styling is messed up...
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
  buttonText: {
    fontSize: 10
  },
   button: {  // TODO: change alignment.
    width: 300,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderColor: 'blue', 
    borderWidth: 0.5
  },
  overlayButtonLeft: { // TODO: use icon instead of bordered text
    width: 30,
    height: 30,
//     left: 30,
//     top: 50,
    backgroundColor: 'white',
    borderColor: 'blue', 
    borderWidth: 0.5
  },
  alignOverlayLeft: {
    left: 30,
    top: 50,
  },
  alignOverlayRight: {
    left: 250,
    top: 50,
  },
  overlayButtonRight: { // TODO: use icon instead of bordered text
    width: 30,
    height: 30,
//     left: 250,
    // right: 80, // picture is not in the middle of the scrollView currently, need to change.
//     top: 50,
    backgroundColor: 'white',
    borderColor: 'blue', 
    borderWidth: 0.5
  },
  scrollView: { // TODO: scrollView doesn't have spacing between images currently.
    backgroundColor: '#6A85B1',
    // position: 'absolute', top: 10,
    marginTop: 10,
    marginBottom: 10,
    height: 500
  },
  bottomAlign: {
    position: 'absolute',
    left: 60,
    bottom: 30
  }
});

class TopRated extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todayCards: [],
      allCards: [],
      showAll: false,
      allImages: []
    }
  }
  
  componentWillMount() {
    var that = this;
  
    // fetch all images
    fetch('https://shielded-springs-75726.herokuapp.com/photos', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }).then( (res) => {
      return res.json();
    }).then( (data) => {
      console.log('all images', data);
      that.setState({allImages: data});
      // NOTE: data: {limit: 5, sort: 'likes', order: 'desc'} which works in $.ajax doesn't work w fetch()
      // get the top 5 of the day
      fetch('https://shielded-springs-75726.herokuapp.com/captions/giveusthisday', { 
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      }).then( (res) => {
        return res.json();
      }).then( (data) => {
        console.log('presort top5 today', data);
        var sortedTodayByLikes = _.sortBy(data, 'likes').reverse().slice(0, 5);
        console.log('postsort top5 today', sortedTodayByLikes);

        // NOTE potential promise dependency issue re: images.
        var todayCards = sortedTodayByLikes.map( (caption) => {
          var image = that.state.allImages.filter( (imageObj) => {
            return imageObj.id === caption.photoId; // check prop names.
          }); // returns [{..., url: string}]
          var card = {
            caption: caption, // {caption_bottom, caption_top, etc.}
            imageURL: image[0].url // check prop names.
          }
          return card;
        });

        console.log('todayCards', todayCards);
        that.setState({todayCards: todayCards});
      }).catch( (err) => {
        console.log('error on captions/giveusthisday GET', err);
      });

      // top 10 all time
      fetch('https://shielded-springs-75726.herokuapp.com/captions', { 
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      }).then( (res) => {
        return res.json();
      }).then( (data) => {
        console.log('presort top10 alltime', data);
        var sortedAllByLikes = _.sortBy(data, 'likes').reverse().slice(0, 10);
        console.log('postsort top10 alltime', sortedAllByLikes);

        // NOTE potential promise dependency issue re: images.
        var allCards = sortedAllByLikes.map( (caption) => {
          var image = that.state.allImages.filter( (imageObj) => {
            return imageObj.id === caption.photoId; // check prop names.
          }); // returns [{..., url: string}]
          var card = {
            caption: caption, // {caption_bottom, caption_top, etc.}
            imageURL: image[0].url // check prop names.
          }
          return card;
        });

        console.log('allCards', allCards);
        that.setState({allCards: allCards});
      }).catch( (err) => {
        console.log('error on captions/giveusthisday GET', err);
      });
    });
  }
  
  showTodayTop() {
    this.setState({showAll: false});
  }
  
  showAllTop() {
    this.setState({showAll: true});
  }
  
  // NOTE: TouchableHighlight on Image in ScrollView doesn't work well.
  // experimented (lastmin) with <View><TouchableHighlight>...</TouchableHighlight></View>
  // for now disabled, until solved. 
  // bug: manual click doesn't work, and both buttons are automatically clicked on scrollview render.
  handleUpvote(captionId) { 
   // api.upVote(captionId); 
    console.log('upvoted'); 
//     alert('upvoted!');
  }
  handleNope(captionId) {
  //  api.downVote(captionId);
//     alert('downvoted!');
    console.log('downvoted');
  }
  
  fontStyle(font) {  // NOTE: was dependent on re-renders due to keys on text elements before.
    if (font) {
      font = font.slice(1, font.length-1);
    } else {
      font = 'Karla-Bold';
    }
    
    return {  
      fontSize: 20, // change ? 
      width: 300,
      height: 20,
      textAlign: 'center',
      backgroundColor: 'rgba(0,0,0,0)',
      color: 'white',
      fontFamily: font
    };
  }

  render() {
  var that = this;
    
    var _scrollView: ScrollView; // TODO: improve styling.
    return (
      <View>
        <ScrollView // TODO: change where the scroll starts.
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}
          onScroll={() => { console.log('onScroll!'); }} // not needed
          scrollEventThrottle={200} // not needed
          style={styles.scrollView}>
          {this.state.showAll ? this.state.allCards.map( (caption) => { // TODO: clean up caption structure.
            return <Image key={caption.caption.id} style={styles.image}  // placeholder
                     source={{uri: caption.imageURL || 'https://s3-us-west-1.amazonaws.com/labitapp/dog1.jpeg'}}>
              <View style={styles.topAlign}>
                <Text style={that.fontStyle(caption.caption.font)}>{caption.caption.caption_top || 'no top'}</Text>
              </View>
              <View style={styles.bottomAlign}>
                <Text style={that.fontStyle(caption.caption.font)}>{caption.caption.caption_bottom || 'no bottom'}</Text>
              </View>
              <View style={styles.alignOverlayLeft}>
                <TouchableHighlight style={styles.overlayButtonLeft} onPress={that.handleNope(caption.caption.id)}>
                  <Text style={styles.buttonText}>
                    Downvote
                  </Text>
                </TouchableHighlight>
              </View>
              <View style={styles.alignOverlayRight}>
                <TouchableHighlight style={styles.overlayButtonRight} onPress={that.handleUpvote(caption.caption.id)}>
                  <Text style={styles.buttonText}>
                    Upvote
                  </Text>
                </TouchableHighlight>
              </View>
              <View style={styles.bottomAlign}>
                <Text style={styles.buttonText}>Number of Likes: {caption.caption.likes || 0} </Text>
              </View>   
            </Image> 
            }) : this.state.todayCards.map( (caption) => {
              return <Image key={caption.caption.id} style={styles.image} // placeholder
                       source={{uri: caption.imageURL || 'https://s3-us-west-1.amazonaws.com/labitapp/dog1.jpeg'}}> 
                <View style={styles.topAlign}>
                  <Text style={that.fontStyle(caption.caption.font)}>{caption.caption.caption_top || 'no top'}</Text>
                </View>
                <View style={styles.bottomAlign}>
                  <Text style={that.fontStyle(caption.caption.font)}>{caption.caption.caption_bottom || 'no bottom'}</Text>
                </View>
              <View style={styles.alignOverlayLeft}>
                <TouchableHighlight style={styles.overlayButtonLeft} onPress={that.handleNope(caption.caption.id)}>
                  <Text style={styles.buttonText}>
                    Downvote
                  </Text>
                </TouchableHighlight>
              </View>
              <View style={styles.alignOverlayRight}>
                <TouchableHighlight style={styles.overlayButtonRight} onPress={that.handleUpvote(caption.caption.id)}>
                  <Text style={styles.buttonText}>
                    Upvote
                  </Text>
              </TouchableHighlight>
              </View>
              <View style={styles.bottomAlign}>
                <Text style={styles.buttonText}>Number of Likes: {caption.caption.likes || 0} </Text>
              </View>  
              </Image>
            })
          } 
        </ScrollView>
       
        <TouchableHighlight style={styles.button} onPress={this.showTodayTop.bind(this)}>
          <Text style={styles.text}> Today's top 5 </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.showAllTop.bind(this)}>
          <Text style={styles.text}> All-Time top 10 </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default TopRated