import React, { Component } from 'react';
import{
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View,
} from 'react-native'
import Swiper from 'react-native-swiper'
import api from './../Utils/api';
import Icon from 'react-native-vector-icons/FontAwesome';
const leftArrow = (<Icon name="arrow-left" size={30} color="#900" />);
const rightArrow = (<Icon name="arrow-right" size={30} color="#900" />);

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
  AccessToken
} = FBSDK;

var Login = React.createClass({ // add extra permissions on next line.
  render: function() {
    return (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                ("login has error: ", error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data);
                    var userId = data.userID;
                    const infoRequest = new GraphRequest(
                      `/${userId}?fields=id,name,email,picture`,
                      null,
                      (err, res) => { err ? console.log(err) : console.log(res); },
                      );  
                      // TODO: in the callback here - instead of console.log(res) we'd send it to the DB
                      // and pass it down via (props) so we keep reference to it.
                    new GraphRequestManager().addRequest(infoRequest).start();
                  }
                )
              }
            }
          }
          onLogoutFinished={
            () => alert("logout.")
            // route to next page ?   
          } />
      </View>
    );
  }
});

var ImageSwiper = React.createClass({
  render: function() {
    return (
      <Swiper style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide1}>
          <Image style={styles.image} source={{uri: 'https://s3-us-west-1.amazonaws.com/labitapp/dog1.jpeg'}} />
          <Text style={styles.text}>Laugh About It!</Text>
          <Login></Login>
        </View>
        <View style={styles.slide2}>
          <Image style={styles.image} source={{uri: 'https://s3-us-west-1.amazonaws.com/labitapp/dog2.jpeg'}} />
          <Text style={styles.text}>Every day we share an image and invite the community to make captions</Text>
          <Login></Login>
        </View>
        <View style={styles.slide3}>
          <Image style={styles.image} source={{uri: 'https://s3-us-west-1.amazonaws.com/labitapp/dog3.jpeg'}} />
          <Text style={styles.text}>Vote on LABs by swiping left/right - and submit your own!</Text>
          <Login></Login>
        </View>
      </Swiper>
    )
  }
});


var styles = StyleSheet.create({
  wrapper: {
  },
  container: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  image: {
    width: 300,
    height: 200
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
});

class Main extends Component {
  constructor(props) { // which props, from where?
    super(props)
    this.state = {} 
  } 
  render() {
    return (
      <View style={styles.container}>
        <ImageSwiper></ImageSwiper>
      </View>
    )
  }
}

export default Main;