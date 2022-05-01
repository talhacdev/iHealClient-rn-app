import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
  Dimensions,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');
const ASPECT_RATIO = DEVICE_WIDTH / DEVICE_HEIGHT;
const LATITUDE_DELTA = 0.101;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import colors from '../../assests/styles';
import Geocoder from 'react-native-geocoding';
import {GOOLGE_MAPS_APIKEY} from '../../config/config';
import {Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../general/Loader';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';
import {getDrivers} from '../../actions/app';
import {placeOrder} from '../../actions/app';

class Finding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      marker: null,
      vehicles: null,
      pause: false,
      address: null,
      paddingBottom: 1,
      loader: false,

      coords: [],
    };
    Geocoder.init(GOOLGE_MAPS_APIKEY); // use a valid API key
  }
  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'iHeal',
          message: 'We need to access your location',
          // buttonNeutral: 'Ask Me Later',
          // buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.getlocation();
      } else {
        this.requestLocationPermission();
      }
    } catch (err) {
      console.log(err);
    }
  };
  componentDidMount = () => {
    const {from, item} = this.props;

    from === 'edit' &&
      this.setState(
        {
          region: {
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.longi),
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          address: item.geo_address,
        },
        () => {},
      );
    try {
      if (Platform.OS == 'ios') {
        Geolocation.requestAuthorization();
        this.getlocation();
      } else {
        this.requestLocationPermission();
      }
    } catch {
      Alert.alert('iHeal', 'Location Permission not granted');
      // this.props.navigation.goBack();
    }
    this.willFocus = this.props.navigation.addListener('willFocus', () => {});
  };
  componentWillUnmount() {
    this.willFocus.remove();
  }
  getlocation = () => {
    const {from, item} = this.props;
    Geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const region = {
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        this.getNearDriver(latitude, longitude);

        from !== 'edit' && this.setState({region, err: false});
        // this.setLocation(region)
        from !== 'edit' && this.setState({loader: true, region});
        Geocoder.from({
          lat: latitude,
          lng: longitude,
        })
          .then(data => {
            const address = data.results[0].formatted_address.replace(
              /\?/g,
              '',
            );
            const selectedAddress = {address, latitude, longitude};
            this.setState({address, selectedAddress, loader: false});
          })
          .catch(err => {
            this.setState({loader: false});
            // Alert.alert('Oops!', 'Failed to get your address');
            // this.props.navigation.goBack();
          });
      },
      error => {
        Alert.alert('Error', 'Location permission not granted');
      },
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );
  };
  calculateDistance = (lat, long) => {
    let {coords} = this.state;

    var R = 6371; // Radius of the earth in km
    const res =
      coords &&
      coords.map(item => {
        var dLat = this.deg2rad(item.coordinates.latitude - lat); // deg2rad below
        var dLon = this.deg2rad(item.coordinates.longitude - long);
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.deg2rad(lat)) *
            Math.cos(this.deg2rad(item.coordinates.latitude)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km

        return {u_id: item.u_id, distance: d.toFixed(1)};
      });

    let filtered =
      res &&
      res.filter(item => {
        return parseFloat(item.distance) <= parseFloat(2000);
      });
    console.log('filtered', coords);
    this.confirmOrder(filtered);
  };
  deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  confirmOrder = async filtered => {
    try {
      const json = this.props.navigation.getParam('json');
      console.log('JSOn', json);
      const formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({
          time: json.time,
          date: json.date,
          cat_id: json.cat_id,
          sub_cat_id: json.sub_cat_id.id,
          des: json.des,
          address: json.address,
          lat: json.lat,
          long: json.long,
          order_id: json.from === 'edit' ? json.item.order_id : '',
        }),
      );
      let nearDrivers =
        filtered &&
        filtered.map(item => {
          return item.u_id;
        });
      console.log(filtered);
      nearDrivers?.map(item => {
        formData.append('u_id[]', item);
      });

      const res = await this.props.placeOrder(
        formData,
        json.phone_no,
        json.session_key,
      );
      console.log('res place', res);
      if (!res.data.status) {
        this.timeout = setTimeout(() => {
          Alert.alert('iHeal', 'No Service Provider Found');
          this.props.navigation.navigate('Home');
        }, 60000);
      } else {
        // Alert.alert('iHeal', res.data.message);
      }
    } catch (err) {}
  };
  getNearDriver = async (latitude, longitude) => {
    try {
      const json = this.props.navigation.getParam('json');
      const {user, nearDrivers} = this.props;

      const res = await this.props.getDrivers(user.session, user.phone_no);
      // var result = res.map(e => {
      //   return e.categories.filter(i => i.vendor_type == json?.sub_cat_id?.id);
      // });
      const re = res?.map(element => {
        return {
          ...element,
          categories: element.categories.filter(
            subElement => subElement.vendor_type === json?.sub_cat_id?.id,
          ),
        };
      });
      const filteredusers = re.filter(filtr => {
        return filtr?.categories?.length > 0 && filtr;
      });
      console.log('re ====>', filteredusers);
      this.setState({coords: filteredusers}, () => {
        this.calculateDistance(latitude, longitude);
      });
    } catch (err) {
      console.log(err);
    }
  };
  move = () => {
    let subCatObj;
    let catObje;
    try {
      const {
        time,
        des,
        date,
        id,
        subId,
        user,
        navigation,
        name,
        lat,
        long,
        from,
        categories,
        subCategories,
        item,
      } = this.props;

      // if (from === 'edit') {
      //   let filteredCat =
      //     categories &&
      //     categories.filter(cat => {
      //       console.log(cat.id, item.cat);

      //       // return cat.id === item.cat;
      //     });
      //   let filteredSub =
      //     subCategories &&
      //     subCategories.filter(sub => {
      //       console.log(sub.id, item.subcat);

      //       // return sub.id === item.subcat;
      //     });
      //   catObje = filteredCat && filteredCat[0];
      //   subCatObj = filteredSub && filteredSub[0];
      // }

      const json = {
        time: item.time,
        date: date,
        cat_id: id,
        sub_cat_id: subId,
        des: des && des,
        address: this.state.address,
        name: name,
        session_key: user && user.session,
        phone_no: user && user.phone_no,
        lat: this.state.region.latitude,
        long: this.state.region.longitude,
        item: item,
        from: from,
      };
      console.log(json);
      return navigation.navigate('Invoice', {json});
      const {selectedAddress} = this.state;
      if (this.props.place) {
        this.props.navigation.navigate('EditLocation', {
          selectedAddress,
          place: this.props.place,
          location_id: this.props.location_id,
        });
      } else {
        this.props.navigation.replace('AddLocation', {selectedAddress});
      }
    } catch (err) {
      console.log(err);
    }
  };
  // setLocation = (latitude, longitude) => {
  //     const marker = { latitude, longitude }
  //     this.setState({ marker, loader: true })
  //     const region = {
  //         latitude, longitude, latitudeDelta: LATITUDE_DELTA,
  //         longitudeDelta: LONGITUDE_DELTA,
  //     }
  //     Geocoder.from({
  //         lat: latitude,
  //         lng: longitude
  //     }).then((data) => {
  //         const address = data.results[0].formatted_address;
  //         const selectedAddress = { address, latitude, longitude }
  //         this.setState({ address, selectedAddress, region, loader: false })
  //     }).catch(err => {
  //         this.setState({ loader: false })
  //         Alert.alert('Oops!', 'Failed to get you address')
  //         this.props.navigation.goBack()
  //     })
  // }
  setLocation = region => {
    try {
      if (region && region.longitude !== 0) {
        const latitude = region.latitude;
        const longitude = region.longitude;
        if (
          latitude.toFixed(6) == this.state.region.latitude.toFixed(6) &&
          longitude.toFixed(6) == this.state.region.longitude.toFixed(6)
        ) {
          return false;
        } else {
          this.setState({region});
          Geocoder.from({
            lat: latitude,
            lng: longitude,
          })
            .then(data => {
              const address = data.results[0].formatted_address.replace(
                /\?/g,
                '',
              );
              const selectedAddress = {address, latitude, longitude};
              this.setState({address, selectedAddress, loader: false});
              // this.mapView.animateToRegion(region, 2000)
            })
            .catch(err => {
              this.setState({loader: false});
              // Alert.alert('Oops!', 'Failed to get you address');
              // this.props.navigation.goBack();
            });
        }
      }
    } catch {
      Alert.alert('Homemeade', 'Location Permission not granted');
      this.props.navigation.popToTop();
    }
  };
  geoCoder = details => {};
  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          backgroundColor={colors.primary}
          leftComponent={
            <Ionicons
              name="arrow-back"
              size={27}
              color={'white'}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          }
          centerComponent={
            <Text style={[styles.texthome]}>Finding Technician</Text>
          }
        />
        <View style={{alignItems: 'center'}} />
        <View style={{flex: 1, zIndex: -1}}>
          <MapView
            style={[
              styles.map,
              {
                paddingBottom: this.state.paddingBottom,
              },
            ]}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: 0,
              longitude: 0,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            zoomEnabled
            zoomControlEnabled
            region={this.state.region}
            // onPress={({ nativeEvent }) => {
            //     const { coordinate } = nativeEvent
            //     const latitude = coordinate.latitude
            //     const longitude = coordinate.longitude
            //     this.setLocation(latitude, longitude)
            // }}
            onRegionChangeComplete={region => {
              this.setLocation(region);
            }}>
            {this.state.coords &&
              this.state.coords.map((markers, index) => {
                return <Marker key={index} coordinate={markers.coordinates} />;
              })}
          </MapView>
          <View style={{backgroundColor: 'white'}}>
            <Text
              style={{
                fontFamily: colors.font,
                padding: 10,
                textAlign: 'center',
                marginVertical: 10,
              }}>
              We are finding technician hold tight
            </Text>
          </View>
          {/* <View style={{position: 'absolute', top: '50%', right: '50%'}}>
            <TouchableOpacity>
              <MaterialIcons
                name="location-on"
                style={{
                  fontSize: 20,
                  color: colors.red,
                }}
              />
            </TouchableOpacity>
          </View> */}
          <View style={styles.currentMarker}>
            <TouchableOpacity onPress={() => this.getlocation()}>
              <MaterialIcons
                name="my-location"
                style={{
                  fontSize: 20,
                  color: colors.primary,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.container,
              {marginBottom: DEVICE_WIDTH > 350 ? 10 : 10},
            ]}
          />
        </View>

        <LottieView
          source={require('./ripple.json')}
          style={{
            width: '150%',
            position: 'absolute',
            top: 0,
            bottom: 0,
            alignSelf: 'center',
          }}
          autoPlay
          loop
        />

        {this.state.loader && <Loader />}
      </View>
    );
  }
}
const mapStateToProps = state => {
  const {user} = state.authReducer;
  const {categories, subCategories, nearDrivers} = state.appReducer;

  return {user, categories, subCategories, nearDrivers};
};
export default connect(
  mapStateToProps,
  {getDrivers, placeOrder},
)(Finding);
const fontFamily = colors.font;
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 40,
    width: '100%',
  },
  texthome: {
    color: 'white',
    fontFamily,
    fontSize: 20,
  },
  currentMarker: {
    position: 'absolute',
    right: 5,
    top: 50,
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowOpacity: 0.5,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: colors.primary,
    marginTop: 10,
    borderRadius: 10,
    height: DEVICE_WIDTH > 350 ? 55 : 45,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 10,
  },
  primaryText: {
    color: colors.white,

    fontSize: DEVICE_WIDTH > 350 ? 22 : 18,
    fontFamily,
  },
});
