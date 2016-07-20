import React, { Component, } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const styles = StyleSheet.create({
  NoMoreCardsText: {
    fontSize: 22
  }
});

class NoMoreCards extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <View>
        <Text style={styles.NoMoreCardsText}>No more cards</Text>
      </View>
    )
  }
}

export default NoMoreCards