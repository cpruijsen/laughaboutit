import React, { Component, } from 'react'
import api from './../Utils/api'
import { View, Text, TextInput, Image, StyleSheet, TouchableHighlight} from 'react-native'

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center', 
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  image: {
    position: 'absolute',
    top: 10,
    left: 50,
    width: 300,
    height: 200
  },
  textInput: {
    marginTop: 5, // TODO: change alignment.
    marginBottom: 5,
    position: 'absolute',
    left: 50, 
    width: 300,
    height: 20, 
    borderColor: 'gray', 
    borderWidth: 0.5
  },
  buttonText: {
    fontSize: 20 
  },
  button: { // TODO: change alignment.
    width: 300,
    marginLeft: 50,
    marginBottom: 7,
    backgroundColor: 'white',
    borderColor: 'blue', 
    borderWidth: 1
  }
});

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
      email: this.state.userEmail // currently no validation on email - best practise would be to validate using Sendgrid or other.
    };
    api.updateUserInfo(userObj);
  }
  /* view must render: 
      - current properties (<Text> </Text>)
      - change fields (<TextInput /> for text && for image ... )
      - submit button (one for the whole page) (<TouchableHighlight> </TouchableHighlight>)
  */
  
  render() {
    return (
      <View style={styles.container}>  
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

export default Settings