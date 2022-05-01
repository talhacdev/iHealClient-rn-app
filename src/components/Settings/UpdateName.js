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
  Keyboard,
} from 'react-native';

import colors from '../../assests/styles';
const {height: DEVICE_HEIGHT} = Dimensions.get('window');
import {Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateProfile} from '../../actions/profile';

import Loader from '../general/Loader';
import DisableKeyboard from '../general/DisableKeyboard';

class UpdateName extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loader: false,
    };
  }
  componentDidMount() {
    this.setState({
      name: this.props.user.name,
    });
  }
  handler = () => {
    const {user, updateProfile, navigation} = this.props;
    let {name} = this.state;
    name = name.trim();
    if (name.length < 2) {
      alert('Please enter first name');
    } else {
      Keyboard.dismiss();
      this.setState({loader: true});
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
          centerComponent={<Text style={[styles.texthome]}>UpdateName</Text>}
        />
        <DisableKeyboard>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="always">
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter your full name"
                placeholderTextColor={colors.schedule}
                style={styles.input}
                onChangeText={name => this.setState({name})}
                value={this.state.name}
              />
            </View>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => this.handler()}>
              <Text style={styles.primaryText}>Update</Text>
            </TouchableOpacity>
            {this.state.loader && <Loader />}
          </ScrollView>
        </DisableKeyboard>
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
)(UpdateName);

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
    marginBottom: DEVICE_HEIGHT > 600 ? 50 : 20,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.schedule,
    marginBottom: 20,
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
    height: DEVICE_HEIGHT > 600 ? 38 : 38,
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
