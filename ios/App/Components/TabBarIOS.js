import React, { Component, } from 'react';
import { View, StyleSheet, NavigatorIOS, TouchableOpacity, TabBarIOS, Animated, PanResponder, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Main from './Main';
import Home from './Home';
import CreateCaption from './CreateCaption'
import UserProfile from './UserProfile'
import Settings from './Settings'

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: 'white',
  },
  button: {
    marginTop: 20,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 4,
  },
});

class ColoredView extends Component {
  componentWillMount() {
    Icon.getImageSource('md-arrow-back', 30).then((source) => this.setState({ backIcon: source }));
  }

//   _navigateToSubview() { // may not need this.
//     this.props.navigator.push({
//       component: ColoredView,
//       title: this.props.pageText,
//       leftButtonIcon: this.state.backIcon,
//       onLeftButtonPress: () => this.props.navigator.pop(),
//       passProps: this.props,
//     });
//   }

  /*  example tab fill.
  <Text style={styles.tabText}>{this.props.pageText}</Text>
        <TouchableOpacity onPress={() => this._navigateToSubview()}>
          <View style={styles.button}><Text style={styles.buttonText}>Tap Me</Text></View>
        </TouchableOpacity>  */
  
  render() {
    return (
      <View style={styles.tabContent}>
        {this.props.component}
      </View>
    );
  }
}


class TabBarIos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'home',
    };
  }

  componentWillMount() {
    // https://github.com/facebook/react-native/issues/1403 prevents this to work for initial load
    Icon.getImageSource('ios-settings', 30).then((source) => this.setState({ gearIcon: source }));
  }

  _renderContent(component) {
    if (!this.state.gearIcon) {
      return false;
    }
    const props = { component: component };
    return (
      <NavigatorIOS
        style={styles.navigator}
        initialRoute={{
          component: ColoredView,
          passProps: props,
          title: pageText
        }}
      />
    );
  }

  render() {
    return (
      <TabBarIOS
        tintColor="black"
        barTintColor="#3abeff">
        <Icon.TabBarItemIOS
          title="Home"
          iconName="ios-home-outline"
          selectedIconName="ios-home"
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            this.setState({
              selectedTab: 'home',
            });
          }}>
          {this._renderContent(CreateCaption)}
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Profile"
          iconName="ios-person-outline"
          selectedIconName="ios-person"
          selected={this.state.selectedTab === 'profile'}
          onPress={() => {
            this.setState({
              selectedTab: 'profile',
            });
          }}>
          {this._renderContent(UserProfile)}
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Starred"
          iconName="ios-star-outline"
          selectedIconName="ios-star"
          selected={this.state.selectedTab === 'starred'}
          onPress={() => {
            this.setState({
              selectedTab: 'starred',
            });
          }}>
          {this._renderContent(Main)}
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Settings"
          iconName="ios-settings-outline"
          selectedIconName="ios-settings"
          selected={this.state.selectedTab === 'settings'}
          onPress={() => {
            this.setState({
              selectedTab: 'settings',
            });
          }}>
          {this._renderContent(Settings)}
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    );
  }
}

export default TabBarIos