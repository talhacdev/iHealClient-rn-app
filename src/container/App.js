import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Drawer from './Drawer/Drawer';
import AuthStack from './StackNavigators/auth';
import AuthStackFI from './StackNavigators/authFI';
import LoadingScreen from './LoadingScreen';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';
import ErrorBoundry from './exceptionHandler';
import {AppEventsLogger} from 'react-native-fbsdk';
import {connect} from 'react-redux';
import {showPopup} from '../actions/app';
import {fcmToken} from '../actions/auth';

import SettingStack from './StackNavigators/SettingStack';
console.disableYellowBox = true;
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      executed: false,
    };
  }

  componentDidMount() {
    SplashScreen.hide();
    this.getData();
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      console.log('DEBUG value: ', value);
      if (value !== null) {
        console.log('DEBUG val: ', value);
        this.setState({executed: true});
        console.log('DEBUG executed: ', this.state.executed);
      }
    } catch (e) {
      console.log('DEBUG ERROR asyncstorage getData: ', value);
    }
  };

  render() {
    if (this.state.executed) {
      return (
        <>
          <ErrorBoundry>
            <AppContainer />
          </ErrorBoundry>
        </>
      );
    } else {
      return (
        <>
          <ErrorBoundry>
            <AppContainerFI />
          </ErrorBoundry>
        </>
      );
    }
  }
}

const AppContainerFI = createAppContainer(
  createSwitchNavigator(
    {
      LoadingScreen: {
        screen: LoadingScreen,
      },
      AuthStack: {
        screen: AuthStackFI,
      },
      Drawer: {
        screen: Drawer,
      },
      SettingStack: {
        screen: SettingStack,
      },
    },
    // {
    //   initialRouteName: 'Drawer',
    // },
  ),
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      LoadingScreen: {
        screen: LoadingScreen,
      },
      AuthStack: {
        screen: AuthStack,
      },
      Drawer: {
        screen: Drawer,
      },
      SettingStack: {
        screen: SettingStack,
      },
    },
    // {
    //   initialRouteName: 'Drawer',
    // },
  ),
);

const mapStateToProps = state => {
  // const {user} = state.authReducer;
  const user = state.authReducer;

  return user;
};
export default connect(
  mapStateToProps,
  {fcmToken},
)(App);
