// import React, {Component, useState, useRef, useEffect} from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   StatusBar,
//   ImageBackground,
//   ScrollView,
//   TouchableOpacity,
//   FlatList,
//   Alert,
//   Dimensions,
//   Image,
//   TextInput,
//   Button,
//   Platform,
// } from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// const height = Dimensions.get('window').height;
// const width = Dimensions.get('window').width;
// import {NavigationActions, StackActions} from 'react-navigation';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import {Header} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Swiper from 'react-native-swiper';

// import colors from '../../assests/styles';
// const fontFamily = colors.font;
// import {
//   electric,
//   plumbing,
//   carpenter,
//   eventImg,
//   cleaning,
//   packers,
//   slider,
// } from '../../assests';
// import {connect} from 'react-redux';
// import {getCategories} from '../../actions/app';
// import Loading from '../Loading';
// import {store_url} from '../../config/config';
// import {showPopup} from '../../actions/app';
// import {fcmToken} from '../../actions/auth';
// import {fcmService} from '../../services/FCMService';
// import {localNotificationService} from '../../services/LocalNotification';
// const Home = ({
//   navigation,
//   getCategories,
//   categories,
//   user,
//   showPopup,
//   fcmToken,
// }) => {
//   const [mail, setMail] = useState('');
//   const [phone, setPhone] = useState('');
//   const seetRef = useRef(null);
//   const [date, setDate] = useState(new Date(1598051730000));
//   const [mode, setMode] = useState('date');
//   const [show, setShow] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // checkpopup();
//     fcmService.registerAppWithFCM();
//     fcmService.register(onRegister, onNotification, onOpenNotification);
//     localNotificationService.configure(onOpenNotification);
//     getCateg();
//   }, []);
//   const getCateg = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('cat_id', '');
//       const res = await getCategories(formData);
//       setLoading(false);
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//     }
//   };

//   const onRegister = async token => {
//     console.log(token);
//     uploadFcmFun(token);
//   };
//   const onNotification = (notify, remoteMessage) => {
//     console.log('[App] onNotification: ', notify);
//     alert(JSON.stringify(notify.body));
//     notify.body === 'Your order is accepted' &&
//       navigation.navigate('OrdersHome');

//     localNotificationService.configure(onOpenNotification, remoteMessage);
//     const options = {
//       soundName: 'default',
//       playSound: true, //,
//       // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
//       // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
//     };
//     localNotificationService.showNotification(
//       0,
//       notify.title,
//       notify.body,
//       notify,
//       options,
//     );
//   };

//   const onOpenNotification = (notify, remoteMessage) => {
//     console.log('[App] onOpenNotification: ', notify);
//     console.log('[App] onOpenNotification: data ', remoteMessage);
//   };
//   const uploadFcmFun = async token => {
//     const data = new FormData();
//     data.append('phone_no', user.phone_no);
//     data.append('session_key', user.session);
//     data.append('token', token);
//     fcmToken(data);
//   };
//   // const checkpopup = async () => {
//   //   try {
//   //     setLoading(true);
//   //     const {phone_no, session} = user;
//   //     const res = await showPopup(phone_no, session);
//   //     console.log(res);
//   //     if (res.data.status) {
//   //       setLoading(false);

//   //       navigation.navigate('Rating');
//   //     } else {
//   //       setLoading(false);

//   //       getCateg();
//   //     }
//   //   } catch (err) {
//   //     console.log(err);
//   //   }
//   // };
//   const renderPages = ({item, index}) => {
//     return (
//       <TouchableOpacity
//         onPress={() => {
//           navigation.navigate('Category', {item: item, from: 'main'});
//         }}
//         key={index}
//         activeOpacity={1}
//         style={styles.cardContainer}>
//         <View
//           style={{
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <Image
//             resizeMode={'contain'}
//             source={{uri: `${store_url}${item.image}`}}
//             style={styles.iconStyle}
//           />

//           <Text
//             style={[
//               styles.mediumText,
//               {textAlign: 'center', color: '#5ACBC2'},
//             ]}>
//             {item.name}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
//         <Header
//           backgroundColor={colors.primary}
//           leftComponent={
//             <Ionicons
//               name="menu"
//               size={27}
//               style={styles.fontsize}
//               onPress={() => {
//                 navigation.toggleDrawer();
//               }}
//             />
//           }
//           centerComponent={
//             <Text style={[styles.texthome]}>Home Lab Tests</Text>
//           }
//         />

//         <View style={{height: height / 5.3}}>
//           <Swiper
//             style={styles.wrapper}
//             paginationStyle={{
//               position: 'absolute',
//               top: height / 5.5,
//             }}>
//             <Image style={styles.imagestyle} source={slider} />

//             <Image style={styles.imagestyle} source={slider} />

//             <Image style={styles.imagestyle} source={slider} />
//           </Swiper>
//         </View>

//         <View
//           style={{
//             padding: 20,
//             marginLeft: 20,
//           }}>
//           <Text style={styles.textw}>Showing results for</Text>
//           <Text style={styles.servicetext}>Home Lab Tests</Text>
//         </View>

//         <View style={styles.optionContainer}>
//           {loading ? (
//             <Loading visible={loading} />
//           ) : (
//             <FlatList
//               data={categories}
//               renderItem={renderPages}
//               keyExtractor={(item, index) => item + index.toString()}
//               showsVerticalScrollIndicator={false}
//               numColumns={3}
//             />
//           )}
//         </View>
//       </View>
//     </ScrollView>
//   );
// };
// const mapStateToProps = state => {
//   const {categories} = state.appReducer;
//   const {user} = state.authReducer;

//   return {categories, user};
// };
// export default connect(
//   mapStateToProps,
//   {getCategories, showPopup, fcmToken},
// )(Home);

// const SIZE = 50;
// const ICON_WRAPPER_SIZE = 45;

// const styles = StyleSheet.create({
//   header: {
//     height: height / 14,
//     backgroundColor: '#1CD5CD',
//     flexDirection: 'row',
//   },
//   servicetext3: {
//     fontSize: 20,
//     marginLeft: 5,
//     color: '#9A98B0',
//   },
//   inputStyle: {
//     backgroundColor: 'white',
//     borderBottomWidth: 1.5,
//     borderTopWidth: 1.5,
//     borderLeftWidth: 1.5,
//     borderRightWidth: 1.5,
//     borderColor: '#E8E8E8',
//     borderRadius: 100,
//   },
//   inputText: {
//     borderWidth: 1,
//     borderColor: 'grey',
//     borderRadius: 5,
//     marginLeft: 0,
//     padding: 10,
//     marginBottom: 15,
//     color: 'black',
//   },
//   fontsize: {
//     color: 'white',
//   },
//   texthome: {
//     color: 'white',
//     fontSize: 15,
//     fontFamily,
//     top: 4,
//   },
//   mediumText: {
//     fontSize: 10,
//     color: '#000',
//     marginVertical: 2,
//     marginLeft: Platform.OS === 'ios' ? 0 : 2,
//     fontFamily,
//   },

//   imagestyle: {flex: 1, width: '100%'},
//   wrapper: {
//     // backgroundColor: 'black',
//     // height: height / 3.2,
//     resizeMode: 'contain',
//     backgroundColor: 'black',
//   },

//   // text: {
//   //   color: '#fff',
//   //   fontSize: 30,
//   //   fontWeight: 'bold',
//   // },
//   servicetext: {
//     color: '#FFB915',
//     fontWeight: 'bold',
//     fontSize: 20,
//   },
//   textw: {
//     fontSize: 20,

//     color: '#9A98B0',
//   },
//   // servicetext1: {
//   //   color: '#1CD5CD',
//   //   fontWeight: 'bold',
//   //   fontSize: 20,
//   //   // marginLeft: 10,
//   // },
//   container: {
//     flex: 1,
//     backgroundColor: colors.white,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 14,
//     justifyContent: 'space-between',
//     borderBottomWidth: 1,
//   },
//   iconStyle: {
//     height: 40,
//     width: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     // borderRadius: 50/2,
//     // backgroundColor: 'red',
//   },
//   cardContainer: {
//     // flex: 1,
//     // backgroundColor:'red',
//     justifyContent: 'center',
//     alignItems: 'center',
//     textAlign: 'center',
//     marginVertical: 5,
//     marginHorizontal: 5,
//     padding: 10,
//     height: 80,
//     width: 80,
//     marginLeft: 10,
//     // borderRadius: 2,
//     backgroundColor: '#F9F7F6',

//     borderRadius: 20,
//     elevation: 5,
//     shadowColor: '#BDBDBD',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//   },

//   pinText: {
//     color: 'black',
//     textAlign: 'center',
//     fontSize: 20,

//     alignSelf: 'center',
//   },
//   searchText: {
//     fontSize: 14,
//     color: '#000',
//     marginLeft: 20,
//   },
//   firstRow: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     flex: 1,
//   },
//   secondRow: {
//     paddingHorizontal: 6,
//     alignItems: 'center',
//   },
//   profileImg: {
//     width: '100%',
//     height: 250,
//     justifyContent: 'flex-end',
//   },
//   profileName: {
//     fontSize: 25,
//     color: 'white',
//     letterSpacing: 0.6,
//     margin: 10,
//   },
//   cameraWrapper: {
//     backgroundColor: colors.primary,
//     width: SIZE,
//     height: SIZE,
//     borderRadius: SIZE / 2,
//     position: 'absolute',
//     bottom: -20,
//     right: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   iconWrapper: {
//     borderRadius: ICON_WRAPPER_SIZE / 2,
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: 'white',
//   },
//   optionContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   optionWrapper: {
//     marginVertical: 10,
//     paddingHorizontal: 16,
//   },
//   optionTitleWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 17,
//     color: '#000',
//     marginLeft: 10,
//   },
//   subtitle: {
//     color: '#eee',
//     fontSize: 12,
//   },
// });

import React, {Component, useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  Dimensions,
  Image,
  TextInput,
  Button,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import {NavigationActions, StackActions} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';

import colors from '../../assests/styles';
const fontFamily = colors.font;
import {slider, Group68} from '../../assests';
import {connect} from 'react-redux';
import {getCategories} from '../../actions/app';
import Loading from '../Loading';
import {store_url} from '../../config/config';
import {showPopup} from '../../actions/app';
import {fcmToken} from '../../actions/auth';
import {fcmService} from '../../services/FCMService';
import {localNotificationService} from '../../services/LocalNotification';

const HomeLabTests = ({
  navigation,
  getCategories,
  categories,
  user,
  showPopup,
  fcmToken,
}) => {
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const seetRef = useRef(null);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // checkpopup();
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);
    getCateg();
  }, []);
  const getCateg = async () => {
    try {
      const formData = new FormData();
      formData.append('cat_id', '2');
      const res = await getCategories(formData);
      console.log('DEBUG getCateg RESPONSE: ', res);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const onRegister = async token => {
    console.log(token);
    uploadFcmFun(token);
  };
  const onNotification = (notify, remoteMessage) => {
    console.log('[App] onNotification: ', notify);
    alert(JSON.stringify(notify.body));
    notify.body === 'Your order is accepted' &&
      navigation.navigate('OrdersHome');

    localNotificationService.configure(onOpenNotification, remoteMessage);
    const options = {
      soundName: 'default',
      playSound: true, //,
      // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
      // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
    };
    localNotificationService.showNotification(
      0,
      notify.title,
      notify.body,
      notify,
      options,
    );
  };

  const onOpenNotification = (notify, remoteMessage) => {
    console.log('[App] onOpenNotification: ', notify);
    console.log('[App] onOpenNotification: data ', remoteMessage);
  };
  const uploadFcmFun = async token => {
    const data = new FormData();
    data.append('phone_no', user.phone_no);
    data.append('session_key', user.session);
    data.append('token', token);
    fcmToken(data);
  };
  // const checkpopup = async () => {
  //   try {
  //     setLoading(true);
  //     const {phone_no, session} = user;
  //     const res = await showPopup(phone_no, session);
  //     console.log(res);
  //     if (res.data.status) {
  //       setLoading(false);

  //       navigation.navigate('Rating');
  //     } else {
  //       setLoading(false);

  //       getCateg();
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const renderPages = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Category', {item: item, from: 'main'});
        }}
        key={index}
        activeOpacity={1}
        style={styles.cardContainer}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            resizeMode={'contain'}
            source={{uri: `${store_url}${item.image}`}}
            style={styles.iconStyle}
          />
          {/* <Image
            resizeMode={'contain'}
            //
            source={Group68}
            style={styles.iconStyle}
          /> */}

          <Text
            style={[
              styles.mediumText,
              // {textAlign: 'center', color: '#5ACBC2'},
              {textAlign: 'center'},
            ]}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <Header
          backgroundColor={colors.primary}
          leftComponent={
            <Ionicons
              name="menu"
              size={27}
              style={styles.fontsize}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          }
          centerComponent={
            <Text style={[styles.texthome]}>Home Lab Tests</Text>
          }
        />

        <View style={{height: height / 5.3}}>
          <Swiper
            style={styles.wrapper}
            paginationStyle={{
              position: 'absolute',
              top: height / 5.5,
            }}>
            <Image style={styles.imagestyle} source={slider} />

            <Image style={styles.imagestyle} source={slider} />

            <Image style={styles.imagestyle} source={slider} />
          </Swiper>
        </View>

        <View
          style={{
            padding: 20,
            marginLeft: 20,
          }}>
          <Text style={styles.textw}>Showing results for</Text>
          <Text style={styles.servicetext}>Home Lab Tests</Text>
        </View>

        <View style={styles.optionContainer}>
          {loading ? (
            <Loading visible={loading} />
          ) : (
            <FlatList
              data={categories}
              renderItem={renderPages}
              keyExtractor={(item, index) => item + index.toString()}
              showsVerticalScrollIndicator={false}
              numColumns={3}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};
const mapStateToProps = state => {
  const {categories} = state.appReducer;
  const {user} = state.authReducer;

  return {categories, user};
};
export default connect(
  mapStateToProps,
  {getCategories, showPopup, fcmToken},
)(HomeLabTests);

const SIZE = 50;
const ICON_WRAPPER_SIZE = 45;

const styles = StyleSheet.create({
  header: {
    height: height / 14,
    backgroundColor: '#1CD5CD',
    flexDirection: 'row',
  },
  servicetext3: {
    fontSize: 20,
    marginLeft: 5,
    color: '#9A98B0',
  },
  inputStyle: {
    backgroundColor: 'white',
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: '#E8E8E8',
    borderRadius: 100,
  },
  inputText: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    marginLeft: 0,
    padding: 10,
    marginBottom: 15,
    color: 'black',
  },
  fontsize: {
    color: 'white',
  },
  texthome: {
    color: 'white',
    fontSize: 15,
    fontFamily,
    top: 4,
  },
  mediumText: {
    fontSize: 10,
    color: '#000',
    marginVertical: 2,
    marginLeft: Platform.OS === 'ios' ? 0 : 2,
    fontFamily,
  },

  imagestyle: {flex: 1, width: '100%'},
  wrapper: {
    // backgroundColor: 'black',
    // height: height / 3.2,
    resizeMode: 'contain',
    backgroundColor: 'black',
  },

  // text: {
  //   color: '#fff',
  //   fontSize: 30,
  //   fontWeight: 'bold',
  // },
  servicetext: {
    color: '#FFB915',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textw: {
    fontSize: 20,

    color: '#9A98B0',
  },
  // servicetext1: {
  //   color: '#1CD5CD',
  //   fontWeight: 'bold',
  //   fontSize: 20,
  //   // marginLeft: 10,
  // },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  iconStyle: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 50/2,
    // backgroundColor: 'red',
  },
  cardContainer: {
    // flex: 1,
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 10,
    height: 95,
    width: 95,
    marginLeft: 10,
    // borderRadius: 2,
    backgroundColor: '#F9F7F6',

    borderRadius: 10,
    elevation: 5,
    shadowColor: '#BDBDBD',
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },

  pinText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,

    alignSelf: 'center',
  },
  searchText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 20,
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  secondRow: {
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  profileImg: {
    width: '100%',
    height: 250,
    justifyContent: 'flex-end',
  },
  profileName: {
    fontSize: 25,
    color: 'white',
    letterSpacing: 0.6,
    margin: 10,
  },
  cameraWrapper: {
    backgroundColor: colors.primary,
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    position: 'absolute',
    bottom: -20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    borderRadius: ICON_WRAPPER_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  optionContainer: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'black',
  },
  optionWrapper: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  optionTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    color: '#000',
    marginLeft: 10,
  },
  subtitle: {
    color: '#eee',
    fontSize: 12,
  },
});
