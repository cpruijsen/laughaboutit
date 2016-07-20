import React, { Component } from 'react';
import{ StyleSheet, Text, Image, View} from 'react-native'
import Swiper from 'react-native-swiper'
import api from './../Utils/api';
const FBSDK = require('react-native-fbsdk');
const { LoginButton, GraphRequest, GraphRequestManager, LoginManager, AccessToken } = FBSDK;

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
                    console.log('successful login', data);
                    var userId = data.userID;
                    
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
                            last_name: res.name.slice(res.name.indexOf(' ')),
                            photo: res.picture,
                            email: res.email,
                            fb_username: userId,
                            fb_access: AccessToken.getCurrentAccessToken() // refactor.
                          };
                          console.log('userObj pre fetch POST to DB', user);
                          api.userSignUp(user);
                        }},
                      );  
                    new GraphRequestManager().addRequest(infoRequest).start();
                  }
                ).then(() => {
                  // this.props.toPage('Home').bind(Main);
                  // somehow navigate to Main...
                })
              }
            }
          }
          onLogoutFinished={ () => alert("logout.") } />
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
    return (
      <View style={styles.container}>
        <ImageSwiper/>
      </View>
    )
  }
}

export default Main;