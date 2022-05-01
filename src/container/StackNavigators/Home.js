import React from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Platform,
  Dimensions,
  Text,
} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');
import colors from '../../assests/styles';
import Logo from '../../assests/header_logo.jpg';
//// home ////
import HomeLabTests from '../../components/Home/Home';
import Category from '../../components/Home/Category';
import CreatePassword from '../../components/auth/Password';
import Map1 from '../../components/Orders/Map';
import Profile from '../../components/Home/Profile/Profile';
import ProfilePic from '../../components/Home/Profile/ProfilePic';
import EditName from '../../components/Home/Profile/EditName';

//// orders /////
import OrdersHome from '../../components/Orders/Home';
import Schedule from '../../components/Orders/Schedule';

import Invoice from '../../components/Orders/Invoice';

import Confirmed from '../../components/Orders/Confirmed';
import Map from '../../components/general/Map';
import Rating from '../../components/Rating/Rating';
import CompletedOrders from '../../components/Orders/CompletedOrders';

import Places from '../../components/general/Places';

import Settings from '../../components/Settings/Home';
import UpdateName from '../../components/Settings/UpdateName';
import UpdatePassword from '../../components/Settings/UpdatePassword';

import UpdatePhone from '../../components/Settings/UpdatePhone';
import OtpAndroidSettings from '../../components/auth/OtpAndroid';
import BookNurse from '../../components/LabTest/BookNurse';
import NurseDressing from '../../components/LabTest/NurseDressing';
import Finding from '../../components/Orders/Finding';
import Messages from '../../components/Messages/Messages';
import Dashboard from '../../components/Dashboard/Dashboard';
const HomeStack = createStackNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        headerShown: false,
      },
    },
    HomeLabTests: {
      screen: HomeLabTests,
      navigationOptions: {
        headerShown: false,
      },
    },
    // Home: {
    //   screen: Dashboard,
    //   navigationOptions: {
    //     headerShown: false,
    //   },
    // },
    BookNurse: {
      screen: BookNurse,
      navigationOptions: {
        headerShown: false,
      },
    },
    NurseDressing: {
      screen: NurseDressing,
      navigationOptions: {
        headerShown: false,
      },
    },
    // Dashboard: {
    //   screen: Dashboard,
    //   navigationOptions: {
    //     headerShown: false,
    //   },
    // },
    Category: {
      screen: Category,
      navigationOptions: {
        headerShown: false,
      },
    },
    Places: {
      screen: Places,
      navigationOptions: {
        headerShown: false,
      },
    },
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
    Map: {
      screen: Map,
      navigationOptions: {
        headerShown: false,
      },
    },
    Rating: {
      screen: Rating,
      navigationOptions: {
        headerShown: false,
      },
    },
    CompletedOrders: {
      screen: CompletedOrders,
      navigationOptions: {
        headerShown: false,
      },
    },
    Map1: {
      screen: Map1,
      navigationOptions: {
        headerShown: false,
      },
    },
    ///////// order //////////
    OrdersHome: {
      screen: OrdersHome,
      navigationOptions: {
        headerShown: false,
      },
    },
    Message: {
      screen: Messages,
      navigationOptions: {
        headerShown: false,
      },
    },

    Schedule: {
      screen: Schedule,
      navigationOptions: ({navigation}) => {
        return {
          title: 'My Schedule',
          headerTitleStyle,
          headerStyle,
          headerLeft: <HeaderLeft navigation={navigation} />,
        };
      },
    },

    Invoice: {
      screen: Invoice,
      navigationOptions: {headerShown: false},
    },
    Finding: {
      screen: Finding,
      navigationOptions: {headerShown: false},
    },

    Confirmed: {
      screen: Confirmed,
      navigationOptions: ({navigation}) => {
        return {
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            height: DEVICE_HEIGHT > 600 ? 80 : 50,
            borderBottomWidth: 0,
          },
          headerLeft: <View />,
          headerRight: <View />,
          // headerRight: (
          //   <View style={{paddingHorizontal: 20}}>
          //     <Image
          //       source={Logo}
          //       style={{
          //         width: DEVICE_HEIGHT < 500 ? 100 : 130,
          //         height: DEVICE_HEIGHT < 500 ? 100 : 130,
          //       }}
          //       resizeMode="contain"
          //     />
          //   </View>
          // ),
        };
      },
    },

    //// settings ////
    SettingsHome: {
      screen: Settings,
      navigationOptions: {
        headerShown: false,
      },
      CreatePassword: {
        screen: CreatePassword,
        navigationOptions: ({navigation}) => {
          return {
            header: null,
          };
        },
      },
      // navigationOptions: ({navigation}) => {
      //   return {
      //     headerLeft: (
      //       <TouchableOpacity
      //         onPress={() => navigation.openDrawer()}
      //         style={{paddingHorizontal: 20}}>
      //         <Icon name="menu" color={colors.primary} style={{fontSize: 35}} />
      //       </TouchableOpacity>
      //     ),
      //     headerRight: (
      //       <View style={{paddingHorizontal: 20}}>
      //         <Image
      //           source={Logo}
      //           style={{
      //             width: DEVICE_HEIGHT < 500 ? 100 : 150,
      //             height: DEVICE_HEIGHT < 500 ? 100 : 150,
      //           }}
      //           resizeMode="contain"
      //         />
      //       </View>
      //     ),
      //     headerStyle: {
      //       elevation: 0,
      //       shadowOpacity: 0,
      //       height: DEVICE_HEIGHT < 500 ? 50 : 80,
      //       borderBottomWidth: 0,
      //       // alignItems:'center'
      //     },
      //   };
      // },
    },

    UpdateName: {
      screen: UpdateName,
      navigationOptions: {
        headerShown: false,
      },
    },
    UpdatePassword: {
      screen: UpdatePassword,
      navigationOptions: {
        headerShown: false,
      },
    },

    UpdatePhone: {
      screen: UpdatePhone,
      navigationOptions: {
        headerShown: false,
      },
    },
    OtpAndroidSettings: {
      screen: OtpAndroidSettings,
      navigationOptions: ({navigation}) => {
        return {
          header: null,
        };
      },
    },
  },
  {
    // initialRouteName: 'Payment',
  },
);

export default HomeStack;

const headerTitleStyle = {
  textAlign: 'center',
  flex: 1,
  right: Platform.OS == 'ios' ? 0 : DEVICE_WIDTH * 0.075,
  fontFamily: colors.font,
};
const headerStyle = {
  elevation: 0,
  shadowOpacity: 0,
  height: DEVICE_HEIGHT < 500 ? 30 : 60,
  borderBottomWidth: 0,
};

function HeaderLeft(props) {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.goBack()}
      style={{paddingHorizontal: 15}}>
      <AntDesign
        name="arrowleft"
        color={colors.number}
        style={{fontSize: 25}}
      />
    </TouchableOpacity>
  );
}
const prevStateWithActions = HomeStack.router.getStateForAction;
HomeStack.router = {
  ...HomeStack.router,
  getStateForAction(action, state) {
    if (state && action.type === 'CustomNav') {
      const routes = state.routes.slice(0, 1);
      routes.push(action);
      return {
        ...state,
        routes,
        index: 1,
      };
    }
    return prevStateWithActions(action, state);
  },
};
