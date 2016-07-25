import React, { Component, } from 'react';
import { View, Image, Text, TouchableHighlight, StyleSheet, ScrollView } from 'react-native';
import api from './../Utils/api';

// all time 10 greatest list. 
// fetch 10 best captions of all time '/captions', then request associated photos passing in the photoId
// list view - with TouchableHighlight voting buttons, and posting user profile links.

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
  }
});

class TopRated extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todayCards: [],
      allCards: [],
      showAll: false,
      allImages
    }
  }
  
  componentWillMount() {
    var that = this;
  
    // fetch all images
    fetch('https://shielded-springs-75726.herokuapp.com/photos', method: 'GET',
      headers: {
        "Content-Type": "application/json",
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
        "Content-Type": "application/json",
      }
    }).then( (res) => {
      return res.json();
    }).then( (data) => {
      console.log('presort top5 today', data);
      var sortedTodayByLikes = data.sort( (a, b) => {
        return a.likes > b.likes;
      }).slice(0, 5);
      console.log('postsort top5 today', sortedTodayByLikes);
      
      // NOTE potential promise dependency issue re: images.
      var todayCards = sortedTodayByLikes.map( (caption) => {
        var image = that.state.allImages.filter( (imageObj) => {
          return imageObj.id === caption.url; // check prop names.
        });
        var card = {
          caption: caption, // {caption_bottom, caption_top, etc.}
          imageURL: 
        }
        return card;
      });
      
      that.setState({todayCards: todayCards});
    }).catch( (err) => {
      console.log('error on captions/giveusthisday GET', err);
    });
    
    // top 10 all time
    fetch('https://shielded-springs-75726.herokuapp.com/captions', { 
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    }).then( (res) => {
      return res.json();
    }).then( (data) => {
      console.log('presort top10 alltime', data);
      var sortedAllByLikes = data.sort( (a, b) => {
        return a.likes > b.likes;
      }).slice(0, 10);
      console.log('postsort top10 alltime', sortedAllByLikes);
      that.setState({allCards: sortedAllByLikes});
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

  render() {
    
/*    
{this.state.showAll ? this.state.allCards.map( (caption) => {
    return 
  }) : this.state.todayCards.map( (caption) => {
    return 
  })
} 
  */ 
    var _scrollView: ScrollView;
    return (
      <View>
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}
          onScroll={() => { console.log('onScroll!'); }}
          scrollEventThrottle={200}
          style={styles.scrollView}>
          {this.state.showAll ? this.state.allCards.map( (caption) => {
            return <Image caption.></Image>
            }) : this.state.todayCards.map( (caption) => {
              return <Image></Image>
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