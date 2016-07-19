import React, { Component, } from 'react'
import api from './../Utils/api'
import { View, } from 'react-native'

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  handleSubmit() {
    var userObj = {
      // the various new states for the user properties
    };
    api.updateUserInfo(userObj);
  };
  handleChange1() {
    // this.setState({});
  };
  
  render() {
    return (
      <View>
        
      </View>
    )
  }
}

export default Settings