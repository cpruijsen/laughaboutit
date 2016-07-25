import _ from 'underscore';
import React, { Component, } from 'react'
import { View, 
  StyleSheet,
  Navigator,
  Text,
  TouchableHighlight,
  Image} from 'react-native'
import api from './../Utils/api';
import SwipeCards from './../Utils/SwipeCards';
import NoMoreCards from './Default';

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

// The card component houses each card and will be dynamically rendered upon each
// new swipe to a new card. 
class Card extends Component {
  // TODO: add userinfo to bottom of card.
  fontStyle(font) {  // NOTE: was dependent on re-renders due to keys on text elements before.
    if (font) {
      font = font.slice(1, font.length-1);
    } else {
      font = 'Karla-Bold';
    }
    
    return {  
      fontSize: 20,
      width: 300,
      height: 20,
      textAlign: 'center',
      backgroundColor: 'rgba(0,0,0,0)',
      color: 'white',
      fontFamily: font
    };
  }

  render() {
    if (!this.props.font) {
      this.props.font = 'Karla-Bold';
    }
    return (
      <View style={styles.card}>
         <Image style={styles.image} source={{uri: this.props.image || 'https://s3-us-west-1.amazonaws.com/labitapp/dog1.jpeg'}}> 
           <View style={styles.topAlign}>
             <Text style={this.fontStyle(this.props.font)}>{this.props.caption_top || 'no top'}</Text>
           </View>
           <View style={styles.bottomAlign}>
             <Text style={this.fontStyle(this.props.font)}>{this.props.caption_bottom || 'no bottom'}</Text>
           </View>
        </Image> 
        <Text style={styles.text}>Number of Likes: {this.props.likes || 0} </Text>   
      </View>
    )
  }
}

class Swiper extends Component {
	constructor(props) {
		super(props);
		this.state = {} 
	}

	handleUpvote(captionId) {
        api.upVote(captionId);
	}
	handleNope(captionId) {
      api.downVote(captionId);
	}

	render() {
		return (
			<SwipeCards
			  cards={this.props.cards} 
			  loop={false}

			  renderCard={(cardData) => <Card {...cardData} />} 
			  renderNoMoreCards={() => <NoMoreCards/>}
			  showYup={true}
			  showNope={true}

			  handleYup={this.handleUpvote}
			  handleNope={this.handleNope}
			/>
		);
	}
}
  
class Home extends Component { // NOTE: this.props.user === userId for current logged in user.
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      bottomCaptionKey: 0,
      topCaptionKey: 0,
      image: null,
    }
  }
  
  fetchCaptions() {
    var that = this;
    
    // fetch the image of the day, and set state if successful. 
    fetch('https://shielded-springs-75726.herokuapp.com/photos/giveusthisday').then( (data) => {
      return data.json();
    }).then( (res) => {
      console.log('success getDailyRawImage', res);
      that.setState({image: res.url}); 
    }).catch( (err) => {
      console.log('err on fetch image - HOME', err);
    }); // TODO: call this from api
    
    // fetch all captions (top-bottom), likes, fonts etc. in sorted order (server side sorting)
     fetch('https://shielded-springs-75726.herokuapp.com/captions/giveusthisday').then( (data) => {
      return data.json();
     }).then( (res) => {
      console.log('success getDailyCaptions', res);  // returns an array of objects [{caption1}, {caption2}, {caption3}] 
      if (res) { 
        var cards = _.map(res, function(caption) {
          return { // TODO: check if res includes posting userId
            caption_bottom: caption.caption_bottom,
            caption_top: caption.caption_top,
            font: caption.font,
            likes: caption.likes,
            dislikes: caption.dislikes,
            id: caption.id,
            userId: caption.userId, // user who posted the caption
            image: that.state.image
          }
        });
        console.log('cards fetched', cards);
        that.setState({cards: cards});
      }
     }).catch( (err) => {
       console.log('err on fetch captions - HOME', err);
     });
  }

  componentWillMount() {   // only fetch images if we haven't done so before
    if (!this.state.image || this.state.cards.length < 1) {
      this.fetchCaptions();
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Swiper style={{flex: 1}} cards={this.state.cards}/>
      </View>
    )
  }
}

export default Home