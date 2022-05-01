import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';

import colors from '../../assests/styles';
import {SHA1} from './hash';
const {height: DEVICE_HEIGHT} = Dimensions.get('window');

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updatePassword} from '../../actions/profile';

import Loader from '../general/Loader';
import DisableKeyboard from '../general/DisableKeyboard';
import {Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
class UpdatePassword extends Component {
  constructor() {
    super();
    this.state = {
      old: '',
    };
  }
  handler = () => {
    const {user, updatePassword, navigation} = this.props;
    let {old, newPass} = this.state;
    if (SHA1(old) === user.password) {
      if (newPass.length < 8) {
        alert('Password must be 8 characters long');
      } else {
        this.setState({loader: true});
        const formData = new FormData();
        formData.append('phone_no', user.phone_no);
        formData.append('session_key', user.session);
        formData.append('password', newPass);
        new Promise((rsl, rej) => {
          updatePassword(formData, rsl, rej);
        })
          .then(res => {
            this.setState({loader: false});
            Alert.alert('Password Updated');
            navigation.goBack();
          })
          .catch(err => {
            Alert.alert('Sorry', err);
            this.setState({loader: false});
          });
      }
    } else {
      Alert.alert('Oops!', 'Wrong password');
    }
  };
  render() {
    return (
      <DisableKeyboard>
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
              <Text style={[styles.texthome]}>UpdatePassword</Text>
            }
          />
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="always">
            <View style={styles.inputContainer}>
              <TextInput
                autoFocus
                secureTextEntry
                placeholder="Old Password"
                placeholderTextColor={colors.schedule}
                style={styles.input}
                onChangeText={old => this.setState({old})}
                value={this.state.old}
                ref={input => (this.old = input)}
                onSubmitEditing={() => this.newPass.focus()}
              />
              <TextInput
                secureTextEntry
                placeholder="New Password"
                placeholderTextColor={colors.schedule}
                style={styles.input}
                onChangeText={newPass => this.setState({newPass})}
                value={this.state.newpass}
                ref={input => (this.newPass = input)}
              />
            </View>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => this.handler()}>
              <Text style={styles.primaryText}>Update</Text>
            </TouchableOpacity>
            {this.state.loader && <Loader />}
          </ScrollView>
        </View>
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
      updatePassword,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdatePassword);

const fontFamily = colors.font;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  texthome: {
    color: 'white',
    fontFamily,
    fontSize: 15,
  },
  text: {
    fontSize: DEVICE_HEIGHT > 600 ? 20 : 16,
    fontFamily,
  },
  inputContainer: {
    width: '80%',
    marginBottom: DEVICE_HEIGHT > 600 ? 30 : 20,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.schedule,
    marginBottom: 40,
    padding: 5,
    fontFamily,
    color: colors.camera,
    // height: DEVICE_HEIGHT > 600 ? 30 : 25,
    fontSize: 15,
  },
  primaryBtn: {
    width: '80%',
    backgroundColor: colors.primary,
    marginTop: 10,
    borderRadius: 10,
    height: DEVICE_HEIGHT > 600 ? 40 : 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  primaryText: {
    color: colors.white,
    fontSize: DEVICE_HEIGHT > 600 ? 16 : 12,
    fontFamily,
  },
});
