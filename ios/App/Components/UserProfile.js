import React, { Component, } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import api from './../Utils/api';
import Icon from 'react-native-vector-icons/FontAwesome';
// styling TODO: import icons
// example: const leftArrow = (<Icon name="arrow-left" size={30} color="#900" />);

// a static user profile page - which another user would see if they clicked on the user avatar? 
// by default this would render your own profile though, when accessed from the Tab Nav 

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
  text: {
    fontSize: 20
  }
});

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: 'TEST',
      last_name: 'LAST',
      userPhoto: 'https://s3-us-west-1.amazonaws.com/labitapp/dog1.jpeg',
      userBio: 'something wicked', // stretch goal
      userCaptions: [] // stretch goal
    }
  }
  
//   componentWillMount() {
//     var that = this;
    
//     var user = api.getUserInfo(this.props.user); // check if it works
//     console.log(user);
//   }

  render() {
    return (
      <View>
        <Image style={styles.image} source={{uri: this.state.userPhoto}}/>
        <Text style={styles.text}>{this.state.first_name}{this.state.last_name}</Text>
      </View>
    )
  }
}

export default UserProfile