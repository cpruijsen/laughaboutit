import React, { Component, } from 'react';
import { View, StyleSheet, Navigator, Text, Image, TextInput, TouchableHighlight} from 'react-native';
import api from './../Utils/api'

var currentFontFamily = 'Karla-Bold';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  image: {
    paddingTop: 10,
    width: 300,
    height: 200
  },
  textInput: {
    height: 20, 
    borderColor: 'gray', 
    borderWidth: 0.5
  },
  topCaption: { 
    fontSize: 20,
    width: 300,
    height: 10,
    textAlign: 'center',
    fontFamily: currentFontFamily, // would be nicer to point to state ? 
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  },
  topAlign: {
    position: 'absolute', // TODO: fix.
    top: 0,
  },
  bottomAlign: {
    position: 'absolute', // TODO: fix.
    bottom: 0,
  },
  bottomCaption: { 
    fontSize: 20,
    width: 300,
    height: 10,
    textAlign: 'center',
    fontFamily: currentFontFamily,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  },
  buttonText: {
    fontSize: 20 // add color? 
  },
  button: {
    marginBottom: 7,
    borderColor: 'blue', // add backgroundColor
    borderWidth: 1
  }
});

class CreateCaption extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topCaption: '',
      bottomCaption: '',
      fontFamily: 'Karla-Bold' // redundant currently.
    }
  }
  
  handleSubmit() {
    var caption = {
      bottomCaption: this.state.bottomCaption,
      topCaption: this.state.topCaption,
      user: '' // passed down from props? username, id and avatar? 
    };
    api.postCaption(caption);
  }
  
  // this will be a dynamic image - based on the daily image 
  // <Image style={styles.image} source={{ uri: {dailyImage} }}/>
  // currently returning an error from endpoint.
  
  render() {
    var dailyImage = api.getDailyRawImage();
    
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: 'https://s3-us-west-1.amazonaws.com/labitapp/dog1.jpeg'}}> 
          <View style={styles.topAlign}>
           <Text style={styles.topCaption}>{this.state.topCaption}</Text>
          </View>
          <View style={styles.bottomAlign}>
            <Text style={styles.bottomCaption}>{this.state.bottomCaption}</Text>
          </View>
        </Image>
        <TextInput style={styles.textInput}
          onChangeText={(text) => this.setState({topCaption: text})}
          value={this.state.topCaption} maxLength={40} />
        <TextInput style={styles.textInput}
          onChangeText={(text) => this.setState({bottomCaption: text})}
          value={this.state.bottomCaption} maxLength={40} />
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit.bind(this)}>
          <Text style={styles.buttonText}>Submit Caption</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default CreateCaption