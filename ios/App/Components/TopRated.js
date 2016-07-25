import React, { Component, } from 'react'
import { View, Image, Text, TouchableHighlight, StyleSheet } from 'react-native'
 
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
      cards: []
    }
  }
  
  componentWillMount() {
    var that = this;
    return fetch('https://shielded-springs-75726.herokuapp.com/captions/giveusthisday', { 
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
      limit: '5' // limit doesn't seem to work. TODO: check FETCH API get limiting.
    }).then( (res) => {
      return res.json();
    }).then( (data) => {
      console.log('toprated - testing limiting', 5, 'on GET', data); 
      that.setState({cards: data});
    }).catch( (err) => {
      console.log('error on captions/giveusthisday GET', err);
    });
  }

  render() {
    return (
      <View>
        <Text style={styles.text}> TopRated Goes Here </Text>
      </View>
    )
  }
}

export default TopRated