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
import {editLocation} from '../../actions/locations';

import Loader from '../general/Loader';
import DismissKeyboard from '../general/DisableKeyboard';

class EditLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      marker: null,
      location: null,
      place: '',
      loader: false,
    };
    this.animate = new Animated.Value(0);
  }
  componentDidMount() {
    this.onFocus = this.props.navigation.addListener('willFocus', () => {
      // alert('ok')
      const selectedAddress = this.props.navigation.getParam('selectedAddress');
      const place = this.props.navigation.getParam('place');
      const location_id = this.props.navigation.getParam('location_id');
      try {
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
          place,
          location_id,
        });
      } catch {}
    });
  }
  handler = () => {
    const {user, editLocation} = this.props;
    const {address, marker, place, location_id} = this.state;
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
      formData.append('location_id', location_id);
      new Promise((rsl, rej) => {
        editLocation(formData, rsl, rej);
      })
        .then(res => {
        
          this.setState({loader: false});
          Alert.alert('Success', res);
          this.props.navigation.goBack();
        })
        .catch(err => {
          this.setState({loader: false});
          Alert.alert('Sorry', err);
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
              zoomEnabled={false}
              zoomControlEnabled={false}
              region={this.state.region}>
              {this.state.marker && (
                <Marker
                  onPress={() =>
                    this.props.navigation.navigate('Places', {
                      place: this.state.place,
                      location_id: this.state.location_id,
                    })
                  }
                  coordinate={this.state.marker}
                />
              )}
            </MapView>
            <View
              style={{
                position: 'absolute',
                alignItems: 'center',
                width: '100%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Places', {
                    place: this.state.place,
                    location_id: this.state.location_id,
                  });
                }}
                style={{height: DEVICE_HEIGHT * 0.55, width: '100%'}}
              />
              <TouchableOpacity>
                {/* // style={{ marginTop: DEVICE_HEIGHT > 1000 ? '80%' : DEVICE_HEIGHT > 600 ? '100%' : '70%' }} > */}
              </TouchableOpacity>
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
                    value={this.state.place}
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
      editLocation,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditLocation);

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
