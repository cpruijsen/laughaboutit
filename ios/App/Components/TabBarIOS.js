import React, { Component, } from 'react';
import { View, StyleSheet, NavigatorIOS, TouchableOpacity, TabBarIOS, Animated, PanResponder, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Main from './Main';
import Home from './Home';
import CreateCaption from './CreateCaption';
import UserProfile from './UserProfile';
import Settings from './Settings';
import TopRated from './TopRated';
import SubmitPhoto from './SubmitPhoto';

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

  render() {
    var userId = this.props.navigator.navigationContext.currentRoute.userId; // current logged in user.
    
    /* to add:
    
    // NOTE: too many tabs? maybe don't list UserProfile as a tab, instead have it as click-through only on captions.
    
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
          <UserProfile user={userId}></UserProfile>
        </Icon.TabBarItemIOS>
      
        <Icon.TabBarItemIOS
          title="Top Rated"
          iconName="ios-star-outline"
          selectedIconName="ios-star"
          selected={this.state.selectedTab === 'top'}
          onPress={() => {
            this.setState({
              selectedTab: 'top',
            });
          }}>
          <TopRated user={userId}></TopRated>
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
          <Settings user={userId}></Settings>
        </Icon.TabBarItemIOS>
    */
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
          <Home user={userId}></Home>
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Create"
          iconName="ios-star-outline"
          selectedIconName="ios-star"
          selected={this.state.selectedTab === 'create'}
          onPress={() => {
            this.setState({
              selectedTab: 'create',
            });
          }}>
          <CreateCaption user={userId}></CreateCaption>
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Top Rated"
          iconName="ios-star-outline"
          selectedIconName="ios-star"
          selected={this.state.selectedTab === 'top'}
          onPress={() => {
            this.setState({
              selectedTab: 'top',
            });
          }}>
          <TopRated user={userId}></TopRated>
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="SubmitPhoto"
          iconName="ios-star-outline"
          selectedIconName="ios-star"
          selected={this.state.selectedTab === 'submit'}
          onPress={() => {
            this.setState({
              selectedTab: 'submit',
            });
          }}>
          <SubmitPhoto user={userId}></SubmitPhoto>
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    );
  }
}

export default TabBarIos