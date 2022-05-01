import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Alert,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  Linking,
} from 'react-native';

import colors from '../../assests/styles';
import mulkiaDefault from '../../assests/mulkia.jpg';
import ImagePicker from 'react-native-image-picker';
const options = {
  mediaType: 'photo',
  noData: true,
  storageOptions: {skipBackup: true},
  quality: 0.1,
  path: 'images',
};

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addVehicle, updateVehicle} from '../../actions/vechicles';

const {height: DEVICE_HEIGHT} = Dimensions.get('window');

import Loader from '../general/Loader';
import {store_url} from '../../config/config';
class Lisence extends Component {
  state = {
    image: null,
    file: null,
    loader: false,
  };
  takePhoto = async () => {
    // Launch Camera:
    let grandted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (grandted || Platform.OS !== 'ios') {
      this.setState({loader: true});
      ImagePicker.launchCamera(options, response => {
        this.setState({loader: false});

        if (response.didCancel) {
        } else if (response.error) {
          Alert.alert('iHeal', 'Something went wrong');
        } else {
          this.setImageFun(response);
        }
      });
    } else {
      Alert.alert('iHeal', 'Please grant permission for camera and gallery.', [
        {
          text: 'Cancel',
        },
        {
          text: 'Open Settings',
          onPress: () => Linking.openSettings(),
        },
      ]);
    }
  };
  gallery = () => {
    // Open Image Library:
    this.setState({loader: true});
    ImagePicker.launchImageLibrary(options, response => {
      this.setState({loader: false});

      if (response.didCancel) {
      } else if (response.error) {
        Alert.alert('iHeal', 'Something went wrong');
      } else {
        this.setImageFun(response);
      }
    });
  };
  chooseOptions = async () => {
    let grandted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (grandted || Platform.OS == 'ios') {
      this.setState({loader: true});
      ImagePicker.showImagePicker(
        {
          title: 'Select Avatar',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
          quality: 0.1,
        },
        response => {
          this.setState({loader: false});
          if (response.didCancel) {
          } else if (response.error) {
            Alert.alert('iHeal', 'Something went wrong!');
          } else {
            this.setImageFun(response);
          }
        },
      );
    } else {
      Alert.alert('iHeal', 'Please grant permission for camera and gallery.', [
        {
          text: 'Cancel',
        },
        {
          text: 'Open Settings',
          onPress: () => Linking.openSettings(),
        },
      ]);
    }
  };
  setImageFun = response => {
    if (response.fileSize < 1000001) {
      const image = {uri: response.uri};
      this.setState({
        image,
        file: response,
      });
    } else {
      Alert.alert(
        'iHeal',
        'File size is too large\nYou can upload maximum of 1 MB image',
      );
    }
  };
  handler = () => {
    this.setState({loader: true});
    const {user, addVehicle, navigation, updateVehicle} = this.props;
    const {file, image, vehicle_id} = this.state;
    const vehicle_data = navigation.getParam('vehicle_data');
    const data = new FormData();

    data.append('plate_no', vehicle_data.plate_number);
    data.append('plate_code', vehicle_data.plate_code);
    data.append('color', vehicle_data.selectedColor);
    data.append('make', vehicle_data.make);
    data.append('model', vehicle_data.model);
    data.append('state_id', vehicle_data.state_id);
    data.append('phone_no', user.phone_no);
    data.append('session_key', user.session);
    if (file) {
      var photo = {
        uri:
          Platform.OS === 'android'
            ? image.uri
            : image.uri.replace('file://', ''),
        type: file.type,
        name: 'image',
        // name: file.fileName,
      };
      data.append('file[]', photo);
    } else {
      data.append('file[]', vehicle_data.mulkiya);
    }
    if (vehicle_id) {
      data.append('vehicle_id', vehicle_id);
      new Promise((rsl, rej) => {
        updateVehicle(data, rsl, rej);
      })
        .then(res => {
          this.setState({loader: false});
          Alert.alert('iHeal', res);
          navigation.navigate('VehiclesHome');
        })
        .catch(err => {
          Alert.alert('Sorry', err);
        });
    } else {
      new Promise((rsl, rej) => {
        addVehicle(data, rsl, rej);
      })
        .then(res => {
          this.setState({loader: false});
          Alert.alert('iHeal', res);
          navigation.dispatch({
            type: 'CustomNav',
            routeName: 'VehiclesHome',
            key: 'VehiclesHome',
          });
        })
        .catch(err => {
          this.setState({loader: false});
          Alert.alert('Sorry!', err);
        });
    }
  };
  async componentDidMount() {
    const {navigation} = this.props;
    const vehicle_id = navigation.getParam('vehicle_id');
    const vehicle_data = navigation.getParam('vehicle_data');
    if (vehicle_id) {
      this.setState({image: vehicle_data.mulkiya, vehicle_id});
    }
    let grandted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (grandted) {
      const galary = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      grandted = galary;
    }
    if (!grandted) {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
    }
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.text}>RTA Mulkiya</Text>
          <View style={styles.imageContainer}>
            {this.state.image == null && (
              <Image
                source={mulkiaDefault}
                style={{
                  width: '100%',
                  height:
                    DEVICE_HEIGHT > 1000
                      ? 350
                      : DEVICE_HEIGHT > 600
                      ? 200
                      : 130,
                  marginBottom: 20,
                }}
              />
            )}

            {!this.state.file ? (
              this.state.image !== null && (
                <IndicatorImage
                  source={{uri: `${store_url}/${this.state.image}`}}
                />
              )
            ) : (
              <IndicatorImage source={this.state.image} />
            )}
            {this.state.image !== null && (
              <View
                style={[
                  styles.btnContainer,
                  {
                    width: '100%',
                    height: DEVICE_HEIGHT > 600 ? 55 : 45,
                    marginTop: 30,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => this.chooseOptions()}
                  style={[styles.secondaryBtn]}>
                  <Text style={styles.text}>Retake Photo</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {this.state.image == null && (
            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={() => this.takePhoto()}
                style={[
                  styles.secondaryBtn,
                  {borderBottomWidth: 1, paddingVertical: 10},
                ]}>
                <Text style={styles.text}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.gallery()}
                style={[
                  styles.secondaryBtn,
                  {borderBottomWidth: 0, paddingVertical: 10},
                ]}>
                <Text style={styles.text}>Choose Photo</Text>
              </TouchableOpacity>
            </View>
          )}
          {this.state.image !== null && (
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => this.handler()}>
              <Text style={styles.primaryText}>Save My Vehicle</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
        {this.state.loader && <Loader />}
      </View>
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
      addVehicle,
      updateVehicle,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lisence);

const fontFamily = colors.font;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 3,
    width: '90%',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: '55%',
  },
  Icon: {
    fontSize: 150,
    marginRight: 8,
    fontWeight: '100',
  },
  cameraContainer: {
    backgroundColor: colors.camera,
    borderRadius: 50,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    top: -40,
    alignSelf: 'flex-end',
  },
  btnContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    width: '90%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    // flex: 1
  },
  secondaryBtn: {
    backgroundColor: colors.secondary,
    padding: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colors.inputFields,
    paddingVertical: DEVICE_HEIGHT > 600 ? 10 : 0,
  },
  text: {
    // color: colors.number,
    fontSize: DEVICE_HEIGHT > 600 ? 17 : 14,
    fontFamily,
  },
  primaryBtn: {
    width: '90%',
    backgroundColor: colors.primary,
    marginTop: 10,
    borderRadius: 10,
    height: DEVICE_HEIGHT > 600 ? 55 : 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: DEVICE_HEIGHT > 600 ? 50 : 30,
  },
  primaryText: {
    color: colors.white,
    fontSize: DEVICE_HEIGHT > 600 ? 22 : 18,
    fontFamily,
  },
});

const IndicatorImage = props => {
  const [loader, setLoader] = React.useState(true);
  return (
    <View
      style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
      <Image
        source={props.source}
        style={{
          width: '100%',
          height: DEVICE_HEIGHT > 1000 ? 350 : DEVICE_HEIGHT > 600 ? 200 : 130,
        }}
        onLoadEnd={() => setLoader(false)}
      />
      {loader && (
        <View style={{position: 'absolute', zIndex: -1}}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};
