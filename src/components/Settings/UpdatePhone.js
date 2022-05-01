import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../assests/styles';

import codes from '../auth/codes';
import Modal from 'react-native-simple-modal';
import {ScrollView} from 'react-native-gesture-handler';
import Loader from '../general/Loader';
import DisableKeyboard from '../general/DisableKeyboard';
import {Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateProfile} from '../../actions/profile';
import {
  signIn,
  signInWithPhone,
  authState,
  confirmOTP,
} from '../../actions/auth';
import {SHA1} from './hash';

const {height: DEVICE_HEIGHT, width: DEVICE_WIDTH} = Dimensions.get('window');

class UpdatePhone extends React.Component {
  constructor() {
    super();
    this.state = {
      countryCode: 'PK',
      phoneNumber: '',
      code: '+92',
      password: '',
    };
  }
  handler = () => {
    const {phoneNumber, code, password} = this.state;
    const {user} = this.props;
    if (phoneNumber.length < 9) {
      Alert.alert('Invalid', 'Please enter a valid phoneNumber');
      return false;
    } else if (!password) {
      Alert.alert(null, 'Please enter password');
    } else if (SHA1(password) !== user.password) {
      Alert.alert('Oops!', 'Wrong Password');
    } else {
      Keyboard.dismiss();
      let number = code + phoneNumber;
      this.setState({loader: true});
      new Promise((rsl, rej) => {
        this.props.signInWithPhone(number, rsl, rej);
      })
        .then(res => {
          this.setState({loader: false});
          this.props.navigation.navigate(
            Platform.OS == 'android' ? 'OtpAndroidSettings' : 'OtpIOSSettings',
            {phone: number, res, update: true},
          );
        })
        .catch(err => {
          this.setState({loader: false});
          Alert.alert(
            'Invalid Phone Number',
            'Please enter a valid phone number',
          );
        });
    }
  };
  render() {
    return (
      <DisableKeyboard>
        <SafeAreaView style={{flex: 1}}>
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
              <Text style={[styles.texthome]}>UpdateNumber</Text>
            }
          />
          <View style={styles.container}>
            <View style={styles.phoneNumberContainer}>
              <TouchableOpacity
                style={styles.pickerContainer}
                onPress={() => this.setState({countryModal: true})}>
                <CountryPicker
                  {...{
                    countryCode: this.state.countryCode,
                    withFlag: true,
                    withEmoji: false,
                  }}
                  visible={false}
                  modalProps={{visible: false}}
                />
                <Text style={styles.phoneNumber}>{this.state.code}</Text>
                <Icon name="angle-down" style={styles.Icon} />
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={this.state.phoneNumber}
                onChangeText={phoneNumber => {
                  if (phoneNumber == 0 && this.state.phoneNumber.length == 0) {
                  } else {
                    this.setState({phoneNumber});
                  }
                }}
                maxLength={10}
                keyboardType="number-pad"
                onSubmitEditing={() => this.password.focus()}
              />
            </View>
            <TextInput
              style={[
                styles.input,
                {width: DEVICE_WIDTH > 700 ? '80%' : '90%'},
              ]}
              placeholder="Password"
              value={this.state.password}
              onChangeText={password => this.setState({password})}
              maxLength={10}
              secureTextEntry
              ref={input => (this.password = input)}
            />
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.primaryBtn}
                mode="contained"
                onPress={() => this.handler()}>
                <Text style={styles.primaryText}>Update</Text>
              </TouchableOpacity>
            </View>
            {this.state.loader && <Loader />}
          </View>
          <Modal
            open={this.state.countryModal}
            modalDidClose={() => this.setState({countryModal: false})}
            modalStyle={{
              backgroundColor: 'white',
            }}
            containerStyle={{
              backgroundColor: 'white',
            }}>
            <ScrollView>
              {codes.map((country, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={{paddingVertical: 10}}
                    onPress={() =>
                      this.setState({
                        countryCode: country.cca2,
                        code: country.code,
                        countryModal: false,
                      })
                    }>
                    <Text>
                      {country.name} ({country.code})
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Modal>
        </SafeAreaView>
      </DisableKeyboard>
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
      signIn,
      signInWithPhone,
      authState,
      confirmOTP,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdatePhone);

const fontFamily = colors.font;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // flex: 1,
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: DEVICE_WIDTH > 700 ? '80%' : '90%',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  texthome: {
    color: 'white',
    fontFamily,
    fontSize: 15,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: colors.inputFields,
    width: '30%',
    paddingBottom: 10,
    marginTop: 50,
    justifyContent: 'space-around',
  },
  phoneNumber: {
    fontSize: 16,
    color: colors.camera,
    fontFamily,
  },
  Icon: {
    color: colors.camera,
    fontSize: 20,
    marginLeft: 5,
  },
  input: {
    backgroundColor: colors.white,
    width: '60%',
    borderBottomWidth: 2,
    borderBottomColor: colors.inputFields,
    height: 50,
    fontSize: DEVICE_HEIGHT > 600 ? 16 : 12,
    fontFamily,
  },
  btnContainer: {
    width: DEVICE_WIDTH > 700 ? '77%' : '85%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: DEVICE_HEIGHT > 600 ? 40 : 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  primaryText: {
    color: colors.white,
    fontSize: DEVICE_HEIGHT > 600 ? 16 : 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily,
  },
});
