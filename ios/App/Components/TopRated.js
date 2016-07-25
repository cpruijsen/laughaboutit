import React, { Component, } from 'react';
import { View, Image, Text, TouchableHighlight, StyleSheet, ScrollView } from 'react-native';
import api from './../Utils/api';
import _ from 'underscore'; 

// scrollView: https://facebook.github.io/react-native/docs/scrollview.html

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
  },
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 500,
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
    });
    
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
          return imageObj.id === caption.url; // check prop names.
        });
        var card = {
          caption: caption, // {caption_bottom, caption_top, etc.}
          imageURL: image.url // check prop names.
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
          return imageObj.id === caption.url; // check prop names.
        });
        var card = {
          caption: caption, // {caption_bottom, caption_top, etc.}
          imageURL: image.url // check prop names.
        }
        return card;
      });
      
      console.log('allCards', allCards);
      that.setState({allCards: allCards});
    }).catch( (err) => {
      console.log('error on captions/giveusthisday GET', err);
    });
  }
  
  showTodayTop() {
    this.setState({showAll: false});
  }
  
  showAllTop() {
    this.setState({showAll: true});
  }
  
  handleUpvote(captionId) {
    api.upVote(captionId);
  }
  handleNope(captionId) {
    api.downVote(captionId);
  }
  
  fontStyle(font) {  // NOTE: was dependent on re-renders due to keys on text elements before.
    if (font) {
      font = font.slice(1, font.length-1);
    } else {
      font = 'Karla-Bold';
    }
    
    return {  
      fontSize: 10, // change ? 
      width: 300,
      height: 10,
      textAlign: 'center',
      backgroundColor: 'rgba(0,0,0,0)',
      color: 'white',
      fontFamily: font
    };
  }

  render() {
  var that = this;

    /*
    <TouchableHighlight style={styles.button} onPress={that.handleUpvote.bind(this)}>Upvote</TouchableHighlight>
    <TouchableHighlight style={styles.button} onPress={that.handleNope.bind(this)}>Downvote</TouchableHighlight>
    */
    
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
             
              <Text style={styles.text}>Number of Likes: {caption.caption.likes || 0} </Text>   
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
                <Text style={styles.text}>Number of Likes: {caption.caption.likes || 0} </Text>   
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