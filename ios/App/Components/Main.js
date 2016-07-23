import React, { Component } from 'react';
import{ StyleSheet, Text, Image, View, Navigator} from 'react-native'
import Swiper from 'react-native-swiper'
import api from './../Utils/api';
const FBSDK = require('react-native-fbsdk');
const { LoginButton, GraphRequest, GraphRequestManager, LoginManager, AccessToken } = FBSDK;

var navigator;
var toPage;
var onForward;

class Login extends Component { // add extra FB permissions on next line.
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <View>
        <LoginButton
          // TODO: add props for navigator etc to Login, LoginButton and ImageSwiper
          // TODO: validate if already logged in when opening app, skip login page.
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                ("login has error: ", error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                var dbUserId;
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log('successful login', data);
                    var userId = data.userID;
                    var accessToken = data.accessToken;
                    
                    const infoRequest = new GraphRequest(
                      `/${userId}?fields=id,name,email,picture`,
                      null,
                      (err, res) => { 
                        if (err) {
                         console.log('graph API error', err);
                        } else {
                          console.log('graph API success', res);  
                          var user = {
                            first_name: res.name.slice(0, res.name.indexOf(' ')),
                            last_name: res.name.slice(res.name.indexOf(' ') + 1),
                            photo: res.picture.data.url,
                            email: res.email,
                            fb_username: userId,
                            fb_access: accessToken
                          };
                          console.log('userObj pre fetch POST to DB', user);
//                           api.userSignUp(user);
                          fetch('https://shielded-springs-75726.herokuapp.com/users/create', { // TODO: call this from api
                            method: 'POST',
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(user)
                          }).then( (data) => {
                            return data.json();
                          }).then( (res) => {
                            console.log('response on userSignUp', res.newUserId);
                            dbUserId = res.newUserId; // custom to this component, so maybe best not to delegate to api
                            toPage('Tab', dbUserId); 
                          }).catch( (err) => {
                            console.log('error userSignUp', err);
                          });
                        }},
                      );  
                    new GraphRequestManager().addRequest(infoRequest).start();
                  }
                ) // removed previous chained promise.
              }
            }
          }
          onLogoutFinished={ () => alert("logout.") } />
      </View>
    );
  }
};

var ImageSwiper = React.createClass({
  render: function() {
    return (
      <Swiper style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide1}>
          <Image style={styles.image} source={{uri: 'https://s3-us-west-1.amazonaws.com/labitapp/dog1.jpeg'}} />
          <Text style={styles.text}>Laugh About It!</Text>
          <Login/>
        </View>
        <View style={styles.slide2}>
          <Image style={styles.image} source={{uri: 'https://s3-us-west-1.amazonaws.com/labitapp/dog2.jpeg'}} />
          <Text style={styles.text}>Every day we share an image and invite the community to make captions</Text>
          <Login/>
        </View>
        <View style={styles.slide3}>
          <Image style={styles.image} source={{uri: 'https://s3-us-west-1.amazonaws.com/labitapp/dog3.jpeg'}} />
          <Text style={styles.text}>Vote on LABs by swiping left/right - and submit your own!</Text>
          <Login/>
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
    navigator = this.props.navigator; // global work-around 
    onForward = this.props.onForward; // as within `Login` props were not being passed.
    toPage = this.props.toPage;
    
    return (
      <View style={styles.container}>
        <ImageSwiper/>
      </View>
    )
  }
}

export default Main;