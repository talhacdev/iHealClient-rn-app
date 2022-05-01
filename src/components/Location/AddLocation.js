import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  PermissionsAndroid,
  Platform,
  Dimensions,
  Animated,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

import colors from '../../assests/styles';
import location from '../../assests/location.png';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addLocation} from '../../actions/locations';

import Loader from '../general/Loader';

import DismissKeyboard from '../general/DisableKeyboard';

class AddLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      marker: null,
      location: null,
      place: null,
      loader: false,
    };
    this.animate = new Animated.Value(0);
  }
  componentDidMount() {
   
    const selectedAddress = this.props.navigation.getParam('selectedAddress');
    this.setState({
      marker: {
        latitude: selectedAddress.latitude,
        longitude: selectedAddress.longitude,
      },
      address: selectedAddress.address,
      region: {
        latitude: selectedAddress.latitude,
        longitude: selectedAddress.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    });
  }
  handler = () => {
    const {user, addLocation} = this.props;
    const {address, marker, place} = this.state;
    if (!place) {
      Alert.alert('Empty', 'Please enter a name for this address');
    } else {
      this.setState({loader: true});
      const formData = new FormData();
      formData.append('session_key', user.session);
      formData.append('phone_no', user.phone_no);
      formData.append('lat', marker.latitude);
      formData.append('long', marker.longitude);
      formData.append('address', address);
      formData.append('place', place);
      new Promise((rsl, rej) => {
        addLocation(formData, rsl, rej);
      })
        .then(res => {
        
          Alert.alert('Success', res);
          this.props.navigation.dispatch({
            type: 'CustomNav',
            routeName: 'LocationHome',
            key: 'LocationHome',
          });
        })
        .catch(err => {
          Alert.alert('Sorry!', err);
        });
    }
  };
  render() {
    const translateY = this.animate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, DEVICE_HEIGHT < 600 ? -200 : -200],
      extrapolate: 'clamp',
    });
    return (
      <DismissKeyboard>
        <View
          style={{flex: 1, aliginItems: 'center', justifyContent: 'center'}}>
          <View
            style={{flex: 1, aliginItems: 'center', justifyContent: 'center'}}>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  height: 30,
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '95%',
                  marginBottom: 5,
                }}>
                <Image
                  source={location}
                  resizeMode="contain"
                  style={{width: 35, height: 35}}
                />
                <Text
                  numberOfLines={2}
                  style={{width: '90%', fontSize: 10, fontFamily}}>
                  {this.state.address}
                </Text>
              </View>
            </View>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              zoomEnabled
              zoomControlEnabled
              region={this.state.region}
              minZoomLevel={15}>
              {this.state.marker && <Marker coordinate={this.state.marker} />}
            </MapView>
            <View
              style={{
                position: 'absolute',
                alignItems: 'center',
                width: '100%',
              }}>
              <View
                style={{
                  marginTop:
                    DEVICE_HEIGHT > 1000
                      ? '80%'
                      : DEVICE_HEIGHT > 600
                      ? '100%'
                      : '70%',
                }}
              />
              <View
                style={{alignItems: 'center', width: '90%', marginTop: '20%'}}>
                <Animated.View
                  style={{
                    width: '100%',
                    backgroundColor: colors.white,
                    padding: 10,
                    borderRadius: 10,
                    marginBottom: 5,
                    transform: [
                      {
                        translateY,
                      },
                    ],
                  }}>
                  <TextInput
                    value={this.state.place}
                    placeholder="Name of location"
                    placeholderTextColor={colors.schedule}
                    style={{
                      fontFamily,
                      textAlign: 'center',
                      height: DEVICE_HEIGHT > 600 ? 40 : 25,
                      fontSize: 16,
                      color: colors.camera,
                    }}
                    onChangeText={place => this.setState({place})}
                    onFocus={() =>
                      Animated.timing(this.animate, {
                        toValue: 1,
                      }).start()
                    }
                    onBlur={() =>
                      Animated.timing(this.animate, {
                        toValue: 0,
                      }).start()
                    }
                  />
                </Animated.View>
                <TouchableOpacity
                  style={styles.primaryBtn}
                  mode="contained"
                  onPress={() => this.handler()}>
                  <Text style={styles.primaryText}>Confirm Location</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {this.state.loader && <Loader />}
        </View>
      </DismissKeyboard>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addLocation,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddLocation);

const fontFamily = colors.font;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: colors.primary,
    marginTop: 10,
    borderRadius: 10,
    height: DEVICE_HEIGHT > 600 ? 55 : 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: DEVICE_HEIGHT > 600 ? 30 : 20,
  },
  primaryText: {
    color: colors.white,
    fontSize: DEVICE_HEIGHT > 600 ? 22 : 18,
    fontFamily,
  },
});
