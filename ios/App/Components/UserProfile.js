import React, { Component, } from 'react';
import { View, } from 'react-native';
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
      first_name: '',
      last_name: '',
      userPhoto: '',
      userBio: '', // stretch goal
      userCaptions: [] // stretch goal
    }
  }
  
  componentWillMount() {
    var that = this;
    
    var user = api.getUserInfo(this.props.user); // check if it works
    console.log(user);
    
    fetch('https://shielded-springs-75726.herokuapp.com/users', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
      body: json.Stringify(this.props.user)
    }).then( (data) => { // TODO: check for endpoint with team.
      return data.json();
    }).then( (res) => {
      console.log('success getUserInfo', res); // {first_name: string, last_name: string, ...}
      // TODO: that.setState({}); for all props being returned.
    });
    
  }

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