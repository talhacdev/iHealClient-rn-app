import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

import colors from '../../../assests/styles';
const {height: DEVICE_HEIGHT} = Dimensions.get('window');

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateProfile} from '../../../actions/profile';
import {Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../../general/Loader';
import DisableKeyboard from '../../general/DisableKeyboard';
class EditName extends Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      loader: false,
    };
  }
  componentDidMount() {
    const {user} = this.props;
    if (user.name) {
      let name = user.name.split(' ');
      this.setState({
        first_name: name[0],
        last_name: name[name.length - 1],
      });
    }
  }
  handler = () => {
    const {user, updateProfile, navigation} = this.props;
    let {first_name, last_name} = this.state;
    first_name = first_name.trim();
    last_name = last_name.trim();
    if (first_name.length < 2) {
      alert('Please enter first name');
    } else if (last_name.length < 2) {
      alert('Please enter last name');
    } else {
      this.setState({loader: true});
      let name = `${first_name} ${last_name}`;
      const formData = new FormData();
      formData.append('phone_no', user.phone_no);
      formData.append('session_key', user.session);
      formData.append('name', name);
      formData.append('cell_no', user.phone_no);
      formData.append('email', user.email);
      new Promise((rsl, rej) => {
        updateProfile(formData, rsl, rej);
      })
        .then(res => {
          this.setState({loader: false});
          navigation.goBack();
        })
        .catch(err => {
          // Alert.alert('No Internet', 'Please Check Your Internet Connection');
          this.setState({loader: false});
        });
    }
  };
  render() {
    const {first_name, last_name, loader} = this.state;
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
          centerComponent={<Text style={[styles.textHome]}>UpdateName</Text>}
        />
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="always">
          <DisableKeyboard>
            <>
              {!this.state.focused && (
                <View style={{flex: 3, marginTop: '5%'}}>
                  <Text style={styles.text}>Please enter your name</Text>
                </View>
              )}
              <View style={styles.inputContainer}>
                <TextInput
                  onFocus={() => this.setState({focused: true})}
                  value={first_name}
                  placeholder="First Name"
                  placeholderTextColor={colors.schedule}
                  style={styles.input}
                  onChangeText={first_name => this.setState({first_name})}
                  ref={input => (this.first_name = input)}
                  onSubmitEditing={() => this.last_name.focus()}
                />
                <TextInput
                  onFocus={() => this.setState({focused: true})}
                  value={last_name}
                  placeholder="Last Name"
                  placeholderTextColor={colors.schedule}
                  style={styles.input}
                  onChangeText={last_name => this.setState({last_name})}
                  ref={input => (this.last_name = input)}
                />
              </View>
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => this.handler()}>
                <Text style={styles.primaryText}>Save</Text>
              </TouchableOpacity>
              {loader && <Loader />}
            </>
          </DisableKeyboard>
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
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditName);

const fontFamily = colors.font;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: DEVICE_HEIGHT > 600 ? 20 : 16,
    fontFamily,
  },
  textHome: {fontSize: 20, color: 'white', fontFamily},
  inputContainer: {
    width: '80%',
    marginBottom: DEVICE_HEIGHT > 600 ? 50 : 20,
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.schedule,
    marginBottom: 20,
    padding: 5,
    fontFamily,
    color: colors.camera,
    // height: DEVICE_HEIGHT > 600 ? 30 : 25,
  },
  primaryBtn: {
    width: '80%',
    backgroundColor: colors.primary,
    marginTop: 10,
    borderRadius: 10,
    height: DEVICE_HEIGHT > 600 ? 55 : 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  primaryText: {
    color: colors.white,
    fontSize: DEVICE_HEIGHT > 600 ? 22 : 18,
    fontFamily,
  },
});
