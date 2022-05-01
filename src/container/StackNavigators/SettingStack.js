import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import EditName from '../../components/Home/Profile/EditName';

import Profile from '../../components/Home/Profile/Profile';
import ProfilePic from '../../components/Home/Profile/ProfilePic';
import colors from '../../assests/styles';

const SettingStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        headerShown: false,
      },
    },
    ProfilePic: {
      screen: ProfilePic,
      navigationOptions: {
        headerShown: false,
      },
    },
    EditName: {
      screen: EditName,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    // initialRouteName: 'CreatePassword',
  },
);

export default SettingStack;
