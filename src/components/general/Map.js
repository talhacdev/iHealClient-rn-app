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
const LATITUDE_DELTA = 0.003;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import colors from '../../assests/styles';
import Geocoder from 'react-native-geocoding';
import {GOOLGE_MAPS_APIKEY} from '../../config/config';
import {Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../general/Loader';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {connect} from 'react-redux';
class MAP extends Component {
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
    };
    Geocoder.init(GOOLGE_MAPS_APIKEY); // use a valid API key
  }
  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
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
  componentDidMount() {
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
    } catch (err) {
      console.log(err);
      Alert.alert('iHeal', 'Location Permission not granted');
      this.props.navigation.goBack();
    }
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
        from !== 'edit' && this.setState({region, err: false});
        // this.setLocation(region)
        this.setState({loader: true, region});
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
            console.log(err);
            this.props.navigation.goBack();
          });
      },
      error => {
        Alert.alert('Error', 'Location permission not granted');
      },
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );
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

      if (from === 'edit') {
        let filteredCat =
          categories &&
          categories.filter(cat => {
            return cat.id === item.cat;
          });
        let filteredSub =
          subCategories &&
          subCategories.filter(sub => {
            return sub.id === item.subcat;
          });
        catObje = filteredCat && filteredCat[0];
        subCatObj = filteredSub && filteredSub[0];
      }
      console.log(categories);
      const json = {
        time: time,
        date: date,
        cat_id: from === 'edit' ? catObje && catObje.id : id,
        sub_cat_id:
          from === 'edit' ? {id: subCatObj.id, name: subCatObj.name} : subId,
        des: des && des,
        address: this.state.address,
        name: from === 'edit' ? catObje && catObje.name : name,
        session_key: user && user.session,
        phone_no: user && user.phone_no,
        lat: this.state.region.latitude,
        long: this.state.region.longitude,
        item: item,
        from: from,
      };

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
              Alert.alert('Oops!', 'Failed to get you address');
              this.props.navigation.goBack();
            });
        }
      }
    } catch {
      Alert.alert('iHeal', 'Location Permission not granted');
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
          centerComponent={<Text style={[styles.texthome]}>Address</Text>}
        />

        <View style={{alignItems: 'center'}}>
          {/* <Text style={{ fontFamily: colors.font }} >
                        Tap on your address to select
                    </Text> */}
          <View
            style={{
              width: '100%',
              flex: 1,
              backgroundColor: 'white',
              zIndex: 1,
            }}>
            {/* <GooglePlacesAutocomplete
              placeholder="Search Address"
              minLength={2}
              autoFocus={false}
              onPress={(data, details) => {
                let {formatted_address, geometry} = details;
                const {location} = geometry;
                formatted_address = formatted_address.replace(/\?/g, '');
                const selectedAddress = {
                  address: formatted_address,
                  latitude: location.lat,
                  longitude: location.lng,
                };
                this.setState({
                  address: formatted_address,
                  selectedAddress,
                  loader: false,
                  region: {
                    latitude: location.lat,
                    longitude: location.lng,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  },
                });
              }}
              fetchDetails={true}
              query={{
                key: GOOLGE_MAPS_APIKEY,
              }}
              styles={{
                textInputContainer: {
                  width: '100%',
                },
                description: {
                  fontWeight: 'bold',
                  fontFamily: colors.font,
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
                textInput: {
                  fontFamily: colors.font,
                },
              }}
              listViewDisplayed={false}
            /> */}
          </View>
        </View>

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
            }}
          />
          <View style={{backgroundColor: 'white'}}>
            <Text
              style={{
                fontFamily: colors.font,
                padding: 10,
                textAlign: 'center',
              }}>
              {this.state.address}
            </Text>
          </View>
          <View style={{position: 'absolute', top: '50%', right: '50%'}}>
            <TouchableOpacity>
              <MaterialIcons
                name="location-on"
                style={{
                  fontSize: 20,
                  color: colors.red,
                }}
              />
            </TouchableOpacity>
          </View>
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
        </View>
        <View
          style={[
            styles.container,
            {marginBottom: DEVICE_WIDTH > 350 ? 10 : 10},
          ]}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => this.move()}>
            <Text style={styles.primaryText}>Continue</Text>
          </TouchableOpacity>
        </View>
        {this.state.loader && <Loader />}
      </View>
    );
  }
}
const mapStateToProps = state => {
  const {user} = state.authReducer;
  const {categories, subCategories} = state.appReducer;

  return {user, categories, subCategories};
};
export default connect(mapStateToProps)(MAP);
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
