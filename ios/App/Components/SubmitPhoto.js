import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import api from './../Utils/api';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

// https://github.com/lwansbrough/react-native-camera
// TODO: make a camera roll button - and https://facebook.github.io/react-native/docs/cameraroll.html component

class SubmitPhoto extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }
  
  _switchCamera() { // TODO: test
    var state = this.state;
    state.cameraType = state.cameraType === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back;
    this.setState(state);
  }
  
  takePicture() { 
    this.camera.capture().then((data) => {
      console.log(data);
      // TODO: post photo to server.
    }).catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          captureTarget={Camera.constants.CaptureTarget.cameraRoll} // or .disk for immediate access?
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    )
  }
}

export default SubmitPhoto