import React, { Component, } from 'react'
import api from './../Utils/api'
import { View, Text, Image, StyleSheet, TouchableHighlight} from 'react-native'

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      oldImage: 'https://s3-us-west-1.amazonaws.com/labitapp/dog1.jpeg', // TODO: make dynamic / based on props?
      userEmail: 'old email - should be based on props',
      photoURL: '',
      lastName: '',
      firstname: ''
    }
  }
  
  handleSubmit() {
    // the various new states for the user properties
    var userObj = {
      first_name: this.state.firstname,
	  last_name: this.state.lastName,
      photo: this.state.photoURL, // how to get this URL ? -- user can upload a selfie or from camera roll ? 
      email: this.state.userEmail
    };
    api.updateUserInfo(userObj);
  };
  
  
  /* view must render: 
      - current properties (<Text> </Text>)
      - change fields (<TextInput /> for text && for image ... )
      - submit button (one for the whole page) (<TouchableHighlight> </TouchableHighlight>)
  */
  
  render() {
    return (
      <View>
        
        <Text>{this.state.firstname}</Text>
        <TextInput style={styles.textInput}
          onChangeText={(text) => this.setState({firstname: text})}
          value={this.state.firstname} maxLength={20} />
        
        <Text>{this.state.lastname}</Text>
        <TextInput style={styles.textInput}
          onChangeText={(text) => this.setState({lastname: text})}
          value={this.state.lastname} maxLength={40} />
        
        <Text>{this.state.userEmail}</Text>
        <TextInput style={styles.textInput}
          onChangeText={(text) => this.setState({userEmail: text})}
          value={this.state.userEmail} maxLength={60} />
        
        <Text>Current Image: </Text>
        <Image style={styles.image} source={{uri: this.state.oldImage}}/>
        
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit.bind(this)}> Submit Changes </TouchableHighlight>
      </View>
    )
  }
}

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
  topCaption: { // TODO: absolute positioning at top of image
    fontSize: 20,
    width: 300,
    height: 10,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  },
  bottomCaption: { // TODO: absolute positioning at bottom of image
    fontSize: 20,
    width: 300,
    height: 10,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  },
  button: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 7,
    borderColor: 'blue',
    borderWidth: 1
  }
});

export default Settings