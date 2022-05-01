import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import {Rating} from 'react-native-ratings';

import colors from '../../assests/styles';
const {height: DEVICE_HEIGHT, width: DEVICE_WIDTH} = Dimensions.get('window');
import profile from '../../assests/profile.png';
import edit from '../../assests/edit.png';
import {store_url} from '../../config/config';
const fontFamily = colors.font;

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logout} from '../../actions/profile';
import {getuserRatingBalance} from '../../actions/app';

const CustomDrawerContentComponent = props => {
  const [userData, setData] = useState(null);
  useEffect(() => {
    props.sessionExpired &&
      Alert.alert(
        'Home Made',
        'Your session has expired',
        [
          {
            text: 'Log in now',
            onPress: () => props.logout(),
          },
        ],
        {cancelable: false},
      );
    return () => {};
  });
  useEffect(() => {
    const unsub = getData();
    return unsub;
  }, [props.navigation]);
  const getData = () => {
    console.log(props);
    const data = new FormData();
    data.append('u_id', props?.user?.u_id);
    data.append('from', 'user');
    new Promise((rsl, rej) => {
      props.getuserRatingBalance(data, rsl, rej);
    })
      .then(res => {
        setData(res?.data?.data);
      })
      .catch(err => {});
  };
  return (
    <SafeAreaView
      style={styles.container}
      forceInset={{top: 'always', horizontal: 'never'}}>
      <ScrollView alwaysBounceVertical={false}>
        <View style={styles.viewContainer}>
          <View style={styles.nameContainer}>
            {props.user && props.user.dp ? (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={{uri: `${store_url}/${props.user.dp}`}}
                  style={{
                    width: DEVICE_WIDTH < 350 ? 60 : 60,
                    height: DEVICE_WIDTH < 350 ? 60 : 60,
                    zIndex: 1,
                    borderRadius: 300,
                    left: -5,
                    // borderWidth:1
                  }}
                  // resizeMode='contain'
                  // onLoad={()=> this.sets}
                />
                <ActivityIndicator style={{position: 'absolute'}} />
              </View>
            ) : (
              <Image
                source={profile}
                style={{
                  width: DEVICE_WIDTH < 350 ? 60 : 60,
                  height: DEVICE_WIDTH < 350 ? 60 : 60,
                }}
                resizeMode="contain"
              />
            )}
            <View>
              <Text style={styles.text}>Welcome!</Text>
              <View style={{alignSelf: 'flex-start', flexDirection: 'row'}}>
                <Rating
                  type="star"
                  readonly
                  ratingCount={5}
                  imageSize={15}
                  startingValue={userData?.totalrating}
                  tintColor={colors.primary}
                  // showRating
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              props.navigation.dispatch({
                type: 'CustomNav',
                routeName: 'Profile',
                key: 'Profile',
              });
            }}>
            <Image
              source={edit}
              style={{
                width: DEVICE_WIDTH < 350 ? 20 : 30,
                height: DEVICE_WIDTH < 350 ? 30 : 50,
                marginBottom: 20,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={{}}>
          {/* <TouchableOpacity
            style={[
              styles.routes,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}
            onPress={() => {
              props.navigation.dispatch({
                type: 'CustomNav',
                routeName: 'Home',
                key: 'Home',
              });
            }}>
            <Text style={styles.routeText}>Home Lab Task</Text>
            <Text
              style={[
                {
                  fontFamily: colors.boldFont,
                  color: colors.white,
                  fontWeight: 'bold',
                  fontSize: DEVICE_WIDTH > 380 ? 18 : 15,
                },
              ]}>
              {userData?.blnc ? `Rs:${userData.blnc}` : 'RS: 0'}
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            // style={styles.routes}
            style={[
              styles.routes,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}
            // onPress={() => {
            //   props.navigation.dispatch({
            //     type: 'CustomNav',
            //     routeName: 'Dashboard',
            //     key: 'Dashboard',
            //   });
            // }}

            onPress={() => {
              props.navigation.dispatch({
                type: 'CustomNav',
                routeName: 'Dashboard',
                key: 'Dashboard',
              });
            }}>
            <Text style={styles.routeText}>Home</Text>
            <Text
              style={[
                {
                  fontFamily: colors.boldFont,
                  color: colors.white,
                  fontWeight: 'bold',
                  fontSize: DEVICE_WIDTH > 380 ? 18 : 15,
                },
              ]}>
              {userData?.blnc ? `Rs:${userData.blnc}` : 'RS: 0'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.routes}
            onPress={() => {
              props.navigation.dispatch({
                type: 'CustomNav',
                routeName: 'OrdersHome',
                key: 'OrdersHome',
              });
            }}>
            <Text style={styles.routeText}>My Orders</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.routes}
            onPress={() => {
              props.navigation.dispatch({
                type: 'CustomNav',
                routeName: 'BookNurse', //BookNurse
                key: 'BookNurse',
              });
            }}>
            <Text style={styles.routeText}>Book a Nurse</Text>
          </TouchableOpacity> */}

          {/*           
          <TouchableOpacity
            style={styles.routes}
            onPress={() => {
              props.navigation.dispatch({
                type: 'CustomNav',
                routeName: 'LocationHome',
                key: 'LocationHome',
              });
            }}>
            <Text style={styles.routeText}>My Locations</Text>
          </TouchableOpacity>
          */}
          {/* <TouchableOpacity
            style={styles.routes}
            onPress={() => {
              props.navigation.dispatch({
                type: 'CustomNav',
                routeName: 'VehiclesHome',
                key: 'VehiclesHome',
              });
            }}>
            <Text style={styles.routeText}>My Vehicles</Text>
          </TouchableOpacity> */}
          {/*         
          <View
            style={[
              {
                width: '100%',
                borderBottomWidth: 1.5,
                borderBottomColor: colors.seperator,
              },
            ]}>
            <TouchableOpacity
              style={[styles.routes, {}]}
              onPress={() => {
                props.navigation.dispatch({
                  type: 'CustomNav',
                  routeName: 'Payment',
                  key: 'Payment',
                });
              }}>
              <Text style={styles.routeText}>Payment Methods</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomWidth: 1.5,
              borderBottomColor: colors.seperator,
            }}>
            <TouchableOpacity style={[styles.routes]}>
              <Text style={styles.routeText}>My Points</Text>
            </TouchableOpacity>
          </View>
           */}
          <TouchableOpacity
            style={styles.routes}
            onPress={() => {
              props.navigation.dispatch({
                type: 'CustomNav',
                routeName: 'SettingsHome',
                key: 'SettingsHome',
              });
            }}>
            <Text style={styles.routeText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.routes}
            onPress={() => {
              Alert.alert('Are you sure', 'You want to logout?', [
                {text: 'No'},
                {
                  text: 'Logout',
                  onPress: () => {
                    props.logout();
                    props.navigation.navigate('AuthStack');
                  },
                },
              ]);
            }}>
            <Text style={styles.routeText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <DrawerItems {...props} />
      </ScrollView>
      <View style={styles.footer}>
        {/* <Text style={styles.footerText}>iHeal by Sysbi</Text> */}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    paddingHorizontal: DEVICE_HEIGHT < 600 ? 10 : 20,
    paddingTop: DEVICE_HEIGHT > 700 ? 50 : DEVICE_HEIGHT < 600 ? 15 : 20,
    paddingBottom: DEVICE_HEIGHT < 600 ? 10 : 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: colors.seperator,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Icon: {
    fontSize: 80,
    marginRight: 8,
  },
  text: {
    color: colors.white,
    fontSize: DEVICE_HEIGHT < 600 ? 17 : 20,
    fontFamily,
  },
  editIcon: {
    fontSize: 30,
  },
  routes: {
    paddingHorizontal: DEVICE_HEIGHT < 600 ? 20 : 30,
    paddingVertical: DEVICE_HEIGHT > 700 ? 20 : DEVICE_HEIGHT < 600 ? 15 : 15,
  },
  routeText: {
    fontFamily,
    fontSize: DEVICE_HEIGHT > 700 ? 18 : DEVICE_HEIGHT < 600 ? 17 : 20,
    color: colors.white,
  },
  footer: {
    padding: DEVICE_HEIGHT < 600 ? 20 : 30,
    // flex: 1,
    // marginTop: DEVICE_HEIGHT > 1000 ? DEVICE_HEIGHT * 0.25 : 0
  },
  footerText: {
    fontSize: 12,
    color: colors.white,
    fontFamily,
    alignSelf: 'center',
  },
});

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    cartData: state.ordersReducer.cartData,
    cards: state.ordersReducer.cards,
    sessionExpired: state.authReducer.sessionExpired,
    balance: state.appReducer.balance,
    totalrating: state.appReducer.totalrating,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logout,
      getuserRatingBalance,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomDrawerContentComponent);
