import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

import emailImage from '../../assests/email.png';
import userImage from '../../assests/user.png';
import phoneImage from '../../assests/phone.png';
import colors from '../../assests/styles';
import {Header} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUserData} from '../../actions/profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Rate from 'react-native-rate';

class SettingsHome extends Component {
  rateAppFun = () => {
    return alert('rated');
    Rate.rate(
      {
        GooglePackageName: 'com.HomeFix',
        AppleAppID: '1512749888',
      },
      success => {
        // alert(JSON.stringify(success))
      },
    );
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
    if (this.props.user) {
      return (
        <View style={{flex: 1}}>
          <Header
            backgroundColor={colors.primary}
            leftComponent={
              <Ionicons
                name="menu"
                size={27}
                color={'white'}
                onPress={() => {
                  this.props.navigation.toggleDrawer();
                }}
              />
            }
            centerComponent={<Text style={[styles.texthome]}>Settings</Text>}
          />
          <ScrollView>
            <Text style={[styles.header, {marginBottom: 10}]}>Profile</Text>
            <View style={styles.info}>
              <TouchableOpacity
                style={styles.list}
                onPress={() => this.props.navigation.navigate('Profile')}>
                <Image
                  source={userImage}
                  resizeMode="contain"
                  style={styles.image}
                />
                <View>
                  <Text style={styles.heading}>Name</Text>
                  <Text style={styles.name}>{this.props.user.name}</Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.list}
                onPress={() => this.props.navigation.navigate('UpdatePhone')}>
                <Image
                  source={phoneImage}
                  resizeMode="contain"
                  style={styles.image}
                />
                <View>
                  <Text style={styles.heading}>Mobile Number</Text>
                  <Text style={styles.name}>{this.props.user.phone_no}</Text>
                </View>
              </TouchableOpacity> */}

              <TouchableOpacity
                style={styles.list}
                onPress={() =>
                  this.props.navigation.navigate('UpdatePassword')
                }>
                <SimpleLineIcons name="lock" style={styles.icon} />
                <View>
                  <Text style={styles.heading}>Change Password</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.header}>About</Text>
            <View style={styles.info}>
              {/* <TouchableOpacity
                style={styles.list}
                onPress={() => this.props.navigation.navigate('Languages')}>
                <SimpleLineIcons name="globe" style={styles.icon} />
                <View>
                  <Text style={styles.heading}>Language</Text>
                  <Text style={styles.name}>English</Text>
                </View>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => this.rateAppFun()}
                style={styles.list}>
                <SimpleLineIcons name="star" style={styles.icon} />
                <View>
                  <Text style={styles.heading}>Rate the App</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.header}>General</Text>
            <TouchableOpacity
              style={styles.list}
              onPress={() => {
                alert('terms');
              }}>
              <Text style={[styles.heading, {marginLeft: 20}]}>
                {' '}
                Terms and Conditions
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    } else {
      return <View />;
    }
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
)(SettingsHome);

const fontFamily = colors.font;

const styles = StyleSheet.create({
  header: {
    color: colors.primary,
    fontSize: DEVICE_HEIGHT > 600 ? 22 : 18,
    marginLeft: 18,
    fontFamily,
    marginTop: 10,
  },
  texthome: {
    color: 'white',
    fontFamily,
    fontSize: 15,
  },
  info: {
    borderBottomWidth: 1.5,
    paddingBottom: 10,
    borderBottomColor: 'rgba(209,209,209,0.5)',
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    height: 35,
    width: 35,
    marginLeft: 25,
    marginRight: 5,
  },
  heading: {
    fontSize: DEVICE_HEIGHT > 600 ? 16 : 12,
    fontFamily,
    marginTop: 15,
  },
  name: {
    fontSize: DEVICE_HEIGHT > 600 ? 12 : 9,
    fontFamily,
  },
  icon: {
    fontSize: 25,
    marginLeft: 30,
    marginRight: 9,
  },
});
