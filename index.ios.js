import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View,
  Image
} from 'react-native'
import Main from './ios/App/Components/Main';
import Home from './ios/App/Components/Home';
import TabBarIos from './ios/App/Components/TabBarIOS';
import CreateCaption from './ios/App/Components/CreateCaption'
import UserProfile from './ios/App/Components/UserProfile'
import Settings from './ios/App/Components/Settings'

 class test2 extends Component {
   render(){
     var that = this; 
    // Creates an array for the initial route stack. May be unnecessary to have initial route stack
    // so pending re-examination and possible removal. 
    const routeStack = [{name: 'Main', index: 0}, {name: 'Tab', index: 1}, {name: 'Home', index: 2}, {name: 'Caption', index: 3}, {name: 'User', index: 4}, {name: 'Settings', index: 5}];
    // renderScene is the main bread and butter of the navigation as it is passed into the 
    // Navigator component in order to route between different components. 
    var renderScene = (route, navigator) => {
    /* ******************* HELPER FUNCTIONS TO BE PASSED TO CHILD COMPONENTS ***************** */
      var onForward = () => {
        const nextIndex = route.index + 1; // TODO: customize logic.
        navigator.push({name: route.name === 'Main' ? 'Home' : 'Main', index: nextIndex});
      }
      var onBack = () => {
        route.index > 0 ? navigator.pop() : null;
      }
      // Main function to implement dynamic navigation:
      var toPage = (pageName, userId) => { 
        const nextIndex = route.index + 1; 
        navigator.push({name: pageName, index: nextIndex, userId: userId}); 
        // hackaround for passing props http://stackoverflow.com/questions/33830493/react-native-navigator
        // on Tab -> var userId = this.props.navigator.navigationContext.currentRoute.userId; 
      }
      /* **************************** MAIN BODY OF THE ROUTER ******************************** */
      if (route.name === 'Main') {
        return <Main title={'Welcome'} navigator={navigator} onForward={onForward} toPage={toPage} {...route.passProps}/>
      }
      if (route.name === 'Home') {
        return <Home title={'Home'} navigator={navigator} onForward={onForward} toPage={toPage} {...route.passProps}/>
      }
      if (route.name === 'Tab') {
        return <TabBarIos title={'Tab'} navigator={navigator} onForward={onForward} toPage={toPage} {...route.passProps}/>
      }
      if (route.name === 'Caption') {
        return <CreateCaption title={'Caption'} navigator={navigator} onForward={onForward} toPage={toPage} {...route.passProps}/>
      }
       if (route.name === 'User') {
        return <UserProfile title={'Caption'} navigator={navigator} onForward={onForward} toPage={toPage} {...route.passProps}/>
      }
       if (route.name === 'Settings') {
        return <Settings title={'Caption'} navigator={navigator} onForward={onForward} toPage={toPage} {...route.passProps}/>
      }
    }
    // This navigator component now holds all the components of the app. 
    return (
      <Navigator style={{flex: 1}} initialRoute={routeStack[0]} 
       initialRouteStack={this.routeStack} renderScene={renderScene}/>
    );
  }
};

 AppRegistry.registerComponent('test2', () => test2);
