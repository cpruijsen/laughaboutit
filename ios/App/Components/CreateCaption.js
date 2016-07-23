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
    borderWidth: 0.5
  },
  text: {
    fontSize: 20
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
      topCaptionKey: 0,
      dailyImage: null,
      photoId: null,
      successMessage: false,
      errorMessage: false
    }
  }
  
  handleSubmit() { // NOTE: could throttle this somehow, to limit uploads.
    var that = this; // currently not limited, successMessage is shown on upload.
    var caption = {
      caption_bottom: this.state.bottomCaption,
      caption_top: this.state.topCaption,
      font: this.state.fontFamilyOptions[this.state.optionIndex],
      userId: this.props.user, // passed down Main -> index -> Tab -> CreateCaption
      photoId: this.state.photoId,
      likes: 0,
      dislikes: 0
    };
    console.log(caption, 'caption pre post');
//     api.postCaption(caption);
    fetch('https://shielded-springs-75726.herokuapp.com/captions/giveusthisday', {  // TODO: call this from api
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(caption) 
    }).then( (res) => { 
      that.setState({successMessage: true});
      that.setState({errorMessage: false});
      console.log('success postCaption', res); 
    }).catch( (err) => { 
      that.setState({errorMessage: true});
      console.log('error on postCaption', err); 
    });
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
 
  componentWillMount() { 
    var that = this;
    if (!this.state.dailyImage) {
      fetch('https://shielded-springs-75726.herokuapp.com/photos/giveusthisday').then( (data) => {
        return data.json();
      }).then( (res) => {
        console.log('success getDailyRawImage', res);
        that.setState({dailyImage: res.url}); 
        that.setState({photoId: res.id});
      }); // TODO: call this from api
    }
  } 
  
  render() {
    return (
      <View style={styles.container}>
        
        <Image style={styles.image} source={{uri: this.state.dailyImage || 'https://s3-us-west-1.amazonaws.com/labitapp/dog1.jpeg'}}> 
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
        
        {this.state.successMessage ? <Text style={styles.text}>Upload Success!</Text> : <Text></Text>}
        {this.state.errorMessage ? <Text style={styles.text}>Upload Error! Try Again :) </Text> : <Text></Text>}
        
      </View>
    )
  }
}

export default CreateCaption