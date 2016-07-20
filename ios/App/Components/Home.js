import React, { Component, } from 'react'
import { View, 
  StyleSheet,
  Navigator,
  Text,
  Image} from 'react-native'
import TabBarIos from './TabBarIOS';
import NoMoreCards from './Default';

// the main tinder swiping view.

var styles = StyleSheet.create({
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
  }
});

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <TabBarIos></TabBarIos>
      </View>
    )
  }
}

export default Home