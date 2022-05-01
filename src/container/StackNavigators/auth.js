import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import PhoneInput from '../../components/auth/PhoneInput';
import ConfirmPassword from '../../components/auth/ConfirmPassword';
import CreatePassword from '../../components/auth/Password';
import OtpAndroid from '../../components/auth/OtpAndroid';
import WalkthroughScreen from '../../components/auth/WalkthroughScreen';

import Profile from '../../components/Home/Profile/Profile';
import ProfilePic from '../../components/Home/Profile/ProfilePic';
import colors from '../../assests/styles';

const AuthStack = createStackNavigator(
  {
    // WalkthroughScreen: {
    //   screen: WalkthroughScreen,
    //   navigationOptions: ({navigation}) => {
    //     return {
    //       header: null,
    //     };
    //   },
    // },
    PhoneInput: {
      screen: PhoneInput,
      navigationOptions: ({navigation}) => {
        return {
          header: null,
        };
      },
    },
    OtpAndroid: {
      screen: OtpAndroid,
      navigationOptions: ({navigation}) => {
        return {
          header: null,
        };
      },
    },

    CreatePassword: {
      screen: CreatePassword,
      navigationOptions: ({navigation}) => {
        return {
          header: null,
        };
      },
    },
    ConfirmPassword: {
      screen: ConfirmPassword,
      navigationOptions: ({navigation}) => {
        return {
          header: null,
        };
      },
    },
  },
  {
    // initialRouteName: 'CreatePassword',
  },
);

export default AuthStack;
