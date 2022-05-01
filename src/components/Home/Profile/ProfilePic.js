import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import colors from '../../../assests/styles';
var ImagePicker = require('react-native-image-picker');

import {Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateProfile, deletePhoto} from '../../../actions/profile';

import Loader from '../../general/Loader';
import {store_url} from '../../../config/config';

const options = {
  mediaType: 'photo',
  noData: true,
  storageOptions: {skipBackup: true, cameraRoll: false},
  quality: 0.1,
  path: 'images',
};

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

class ProfilePic extends Component {
  state = {
    image: '',
    file: null,
    loader: false,
    zIndex: true,
  };

  takePhoto = () => {
    // Launch Camera:
    this.setState({loader: true});
    ImagePicker.launchCamera(options, response => {
      this.setState({loader: false});
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        this.setImageFun(response);
      }
    });
  };
  gallery = () => {
    // Open Image Library:
    this.setState({loader: true});
    ImagePicker.launchImageLibrary(options, response => {
      this.setState({loader: false});
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        this.setImageFun(response);
      }
    });
  };
  chooseOption = () => {
    this.setState({loader: true});
    ImagePicker.showImagePicker(
      {
        title: 'Choose Option',
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
        } else {
          this.setImageFun(response);
        }
      },
    );
  };
  setImageFun = response => {
    const image = {uri: response.uri};
    this.setState({
      image,
      file: response,
    });
    this.handler();
  };
  async componentDidMount() {
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
    const {user} = this.props;
    if (user.dp) {
      this.setState({
        image: {uri: `${store_url}/${user.dp}`},
      });
    }
  }
  handler = () => {
    const {user, updateProfile, navigation} = this.props;
    let {image, file} = this.state;
    if (image == user.dp) {
      navigation.goBack();
    } else {
      this.setState({loader: true});
      const formData = new FormData();
      formData.append('phone_no', user.phone_no);
      formData.append('session_key', user.session);
      formData.append('name', user.name);
      formData.append('cell_no', user.phone_no);
      formData.append('email', user.email);
      var photo = {
        uri:
          Platform.OS === 'android'
            ? image.uri
            : image.uri.replace('file://', ''),
        type: file.type,
        name: 'image' + Math.random(),
      };
      formData.append('file', photo);
      console.log(formData);
      new Promise((rsl, rej) => {
        updateProfile(formData, rsl, rej);
      })
        .then(res => {
          this.setState({loader: false});
          navigation.goBack();
        })
        .catch(err => {
          // Alert.alert('No Internet', err);
          this.setState({loader: false});
        });
    }
  };
  delete = () => {
    Alert.alert('Are You Sure', 'You want to delete your profile pic?', [
      {
        text: 'No',
      },
      {
        text: 'Confirm',
        onPress: () => {
          this.setState({image: null, file: null});
          this.deletePic();
        },
      },
    ]);
  };
  deletePic = () => {
    this.setState({loader: true});
    const {user} = this.props;
    const formData = new FormData();
    formData.append('phone_no', user.phone_no);
    formData.append('session_key', user.session);
    new Promise((rsl, rej) => {
      this.props.deletePhoto(formData, rsl, rej);
    })
      .then(res => {
        this.setState({loader: false});
        this.props.navigation.goBack();
      })
      .catch(err => {
        // Alert.alert('No Internet', 'Please Check Your Internet Connection');
        this.setState({loader: false});
      });
  };
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
          centerComponent={<Text style={[styles.textHome]}>My Profile</Text>}
        />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.imageContainer}>
            {this.state.image !== '' && (
              <TouchableOpacity onPress={() => this.chooseOption()}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    source={this.state.image}
                    // resizeMode='contain'
                    style={{
                      width: DEVICE_WIDTH * 0.45,
                      height: DEVICE_WIDTH * 0.45,
                      borderRadius: 500,
                    }}
                    onLoad={() => this.setState({zIndex: false})}
                  />
                  {this.state.zIndex && (
                    <ActivityIndicator style={{position: 'absolute'}} />
                  )}
                </View>
                <View style={styles.cameraContainer}>
                  <SimpleLineIcons
                    name="camera"
                    size={DEVICE_WIDTH * 0.06}
                    color={colors.white}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={() => this.delete()}
              style={[
                styles.secondaryBtn,
                {borderBottomWidth: this.state.image !== null ? 0 : 1},
              ]}>
              <Text style={[styles.text, {color: colors.red}]}>
                Delete Photo
              </Text>
            </TouchableOpacity>
            {this.state.image == '' && (
              <>
                <TouchableOpacity
                  onPress={() => this.takePhoto()}
                  style={[styles.secondaryBtn, {borderBottomWidth: 1}]}>
                  <Text style={styles.text}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.gallery()}
                  style={[styles.secondaryBtn, {borderBottomWidth: 0}]}>
                  <Text style={styles.text}>Choose Photo</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <TouchableOpacity
            style={styles.primaryBtn}
            mode="contained"
            onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.primaryText}>Cancel</Text>
          </TouchableOpacity>
          {this.state.loader && <Loader />}
        </ScrollView>
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
      updateProfile,
      deletePhoto,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilePic);

const fontFamily = colors.font;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '18%',
    // height:DEVICE_HEIGHT
  },
  textHome: {
    fontSize: 15,
    color: 'white',
  },
  imageContainer: {
    flex: 3,
    // marginBottom: '80%'
  },
  Icon: {
    fontSize: 150,
    marginRight: 8,
    fontWeight: '100',
  },
  cameraContainer: {
    backgroundColor: colors.camera,
    borderRadius: 50,
    width: DEVICE_WIDTH * 0.105,
    height: DEVICE_WIDTH * 0.105,
    justifyContent: 'center',
    alignItems: 'center',
    top: -DEVICE_WIDTH * 0.14,
    alignSelf: 'flex-end',
    // right: 8
  },
  btnContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    width: '80%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    // marginTop:'45%',
  },
  secondaryBtn: {
    backgroundColor: colors.secondary,
    padding: 15,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colors.inputFields,
    // height:'100%'
    paddingVertical: DEVICE_HEIGHT > 600 ? 15 : 10,
  },
  text: {
    // color: colors.number,
    fontSize: DEVICE_HEIGHT > 600 ? 17 : 14,
    fontFamily,
  },
  primaryBtn: {
    width: '80%',
    backgroundColor: colors.primary,
    marginTop: 10,
    borderRadius: 10,
    height: DEVICE_HEIGHT > 600 ? 55 : 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryText: {
    color: colors.white,
    fontSize: DEVICE_HEIGHT > 600 ? 22 : 18,
    fontFamily,
  },
});
