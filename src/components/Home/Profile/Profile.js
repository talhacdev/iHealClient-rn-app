import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import colors from '../../../assests/styles';
import edit from '../../../assests/editColor.png';
import profile from '../../../assests/profileColor.png';

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');
import {store_url} from '../../../config/config';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUserData} from '../../../actions/profile';
import {Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
class Profile extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    phone: '',
    zIndex: true,
  };

  componentDidMount() {
    const {getUserData, user, navigation} = this.props;

    this.willFocus = navigation.addListener('willFocus', () => {
      const formData = new FormData();
      formData.append('session_key', user.session);
      formData.append('phone_no', user.phone_no);
      getUserData(formData);
    });
  }
  componentWillUnmount() {
    this.willFocus.remove();
  }
  render() {
    const {user} = this.props;

    return (
      <View style={styles.container}>
        <Header
          backgroundColor={colors.primary}
          leftComponent={
            <Ionicons
              name="arrow-back"
              size={27}
              color={'white'}
              onPress={() => {
                console.log('DEBUG Dashboard pressed.');
                // this.props.navigation.navigate('Home');
                this.props.navigation.navigate('Dashboard');
              }}
            />
          }
          centerComponent={<Text style={[styles.textHome]}>MyProfile</Text>}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ProfilePic')}>
          {user && user.dp.length > 2 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Image
                source={{uri: `${store_url}/${user.dp}`}}
                // resizeMode='contain'
                style={{
                  width: DEVICE_WIDTH * 0.42,
                  height: DEVICE_WIDTH * 0.42,
                  borderRadius: 150,
                }}
                onLoad={() => this.setState({zIndex: false})}
              />
              {this.state.zIndex && (
                <ActivityIndicator style={{position: 'absolute'}} />
              )}
            </View>
          ) : (
            <Image
              source={profile}
              resizeMode="contain"
              style={{
                width: DEVICE_WIDTH * 0.42,
                height: DEVICE_WIDTH * 0.42,
              }}
            />
          )}
          <View style={styles.cameraContainer}>
            <SimpleLineIcons
              name="camera"
              size={DEVICE_WIDTH * 0.06}
              color={colors.white}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={() => this.props.navigation.navigate('EditName')}>
            {user.name.length < 1 ? (
              <Text style={styles.input}>Name</Text>
            ) : (
              <Text style={styles.input}>{user.name}</Text>
            )}
            <Image
              source={edit}
              resizeMode="contain"
              style={{width: 25, height: 25}}
            />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={() => this.props.navigation.navigate('UpdateEmail')}>
            {user.email.length < 1 ? (
              <Text style={styles.input}>Email</Text>
            ) : (
              <Text style={styles.input}>{user.email}</Text>
            )}
            <Image
              source={edit}
              resizeMode="contain"
              style={{width: 25, height: 25}}
            />
          </TouchableOpacity>
        </View> */}
        <View style={styles.inputContainer}>
          <Text style={styles.input}>Mobile Number</Text>
          <Text style={styles.number}>{user.phone_no}</Text>
        </View>
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
      getUserData,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);

const fontFamily = colors.font;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // marginTop: '10%',
  },
  textHome: {color: 'white', fontSize: 20, fontFamily},
  cameraContainer: {
    backgroundColor: colors.camera,
    borderRadius: 50,
    width: DEVICE_WIDTH * 0.105,
    height: DEVICE_WIDTH * 0.105,
    justifyContent: 'center',
    alignItems: 'center',
    top: -DEVICE_WIDTH * 0.13,
    alignSelf: 'flex-end',
    right: 8,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 30,
    marginTop: '10%',
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
    paddingBottom: 10,
  },
  input: {
    color: colors.locationiIcon,
    fontFamily,
  },
  number: {
    color: colors.camera,
    marginTop: 5,
    fontFamily,
  },
  editIcon: {
    fontSize: 20,
  },
});
