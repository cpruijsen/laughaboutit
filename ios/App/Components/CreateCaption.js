import React, { Component, } from 'react';
import { View, StyleSheet, Navigator, Text, Image, TextInput, TouchableHighlight} from 'react-native';
import api from './../Utils/api'

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center', // 'space-around' is nicer? but then textinputs are too low.
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  image: {
    position: 'absolute',
    top: 10,
    left: 50, // positioning... 
    width: 300,
    height: 200
  },
  textInput: { // TODO: change alignment.
    marginTop: 5, 
    marginBottom: 5, 
    marginLeft: 50,
    width: 300,
    height: 20, 
    borderColor: 'gray', 
    borderWidth: 0.5
  },
  topAlign: {
    position: 'absolute',
    top: 10,
  },
  bottomAlign: {
    position: 'absolute',
    bottom: 10,
  },
  buttonText: {
    fontSize: 20 
  },
  button: {  // TODO: change alignment.
    width: 300,
    marginLeft: 50,
    marginBottom: 7,
    backgroundColor: 'white',
    borderColor: 'blue', 
    borderWidth: 1
  }
});

class CreateCaption extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topCaption: '',
      bottomCaption: '',
      fontFamilyOptions: ['Karla', 'Karla-Italic', 'Karla-BoldItalic', 'Karla-Bold'],
      optionIndex: 0,
      bottomCaptionKey: 0,
      topCaptionKey: 0
    }
  }
  
  handleSubmit() {
    var caption = {
      bottomCaption: this.state.bottomCaption,
      topCaption: this.state.topCaption,
      font: this.state.fontFamilyOptions[this.state.optionIndex],
      user: '' // passed down from props? username, id and avatar?,
    };
    api.postCaption(caption);
  }
  
  handleFontChange() {
    if (this.state.optionIndex < this.state.fontFamilyOptions.length-1) {
      this.setState({optionIndex: this.state.optionIndex + 1});
    } else {
      this.setState({optionIndex: 0});
    }
    this.setState({bottomCaptionKey: this.state.bottomCaptionKey + 1});
    this.setState({topCaptionKey: this.state.topCaptionKey + 1});
  }
  
  fontStyle(captionType) {
    return {
      fontSize: 20,
      width: 300,
      height: 20,
      textAlign: 'center',
      backgroundColor: 'rgba(0,0,0,0)',
      color: 'white',
      fontFamily: this.state.fontFamilyOptions[this.state.optionIndex]
    };
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
           <Text key={this.state.topCaptionKey} style={this.fontStyle()}>{this.state.topCaption}</Text>
          </View>
          <View style={styles.bottomAlign}>
            <Text key={this.state.bottomCaptionKey} style={this.fontStyle()}>{this.state.bottomCaption}</Text>
          </View>
        </Image>
        
        <TextInput style={styles.textInput}
          onChangeText={(text) => this.setState({topCaption: text})}
          value={this.state.topCaption} maxLength={40} />
        <TextInput style={styles.textInput}
          onChangeText={(text) => this.setState({bottomCaption: text})}
          value={this.state.bottomCaption} maxLength={40} />
        
        <Text style={styles.textInput}>Current Font: {this.state.fontFamilyOptions[this.state.optionIndex]}</Text>
        <TouchableHighlight style={styles.button} onPress={this.handleFontChange.bind(this)}>
          <Text style={styles.buttonText}>Change Font</Text>
        </TouchableHighlight>
        
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit.bind(this)}>
          <Text style={styles.buttonText}>Submit Caption</Text>
        </TouchableHighlight>
        
      </View>
    )
  }
}

export default CreateCaption