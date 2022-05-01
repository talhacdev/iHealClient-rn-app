import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

import colors from '../../assests/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
const fontFamily = colors.font;
import work from '../../assests/work.png';
import edit from '../../assests/editColor.png';
import trash from '../../assests/trash2.png';

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getLocations, delLocation} from '../../actions/locations';

import Loader from '../general/Loader';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loader: false,
      noLocation: false,
    };
  }
  componentDidMount = () => {
    this.willFocus = this.props.navigation.addListener('willFocus', () => {
      this.getLocationFun();
    });
  };
  getLocationFun = () => {
    const {user, getLocations} = this.props;
    new Promise((rsl, rej) => {
      getLocations(user.phone_no, user.session, rsl, rej);
    })
      .then(res => {
        this.setState({loader: false});
      })
      .catch(err => {
        if (err == 'No Data found.') {
          this.setState({noLocation: true, loader: false});
        }
      });
  };
  deleteFun = item => {
    Alert.alert('iHeal', 'Are you sure you want to delete?', [
      {
        text: ' No',
      },
      {
        text: 'Yes',
        onPress: () => this.deleteLocation(item),
      },
    ]);
  };
  deleteLocation = item => {
    const {user, delLocation} = this.props;
    this.setState({loader: true});
    new Promise((rsl, rej) => {
      delLocation(user.phone_no, user.session, item.location_id, rsl, rej);
    })
      .then(res => {
        this.getLocationFun();
        Alert.alert('Success', res);
      })
      .catch(err => Alert.alert('Sorry', err));
  };
  render() {
    const {locations} = this.props;
    const {loader, noLocation} = this.state;
    return (
      <>
        {locations !== undefined || noLocation ? (
          <View style={styles.container}>
            <ScrollView
              style={{flex: 1, width: '100%'}}
              contentContainerStyle={{alignItems: 'center'}}>
              {!noLocation &&
                locations.map((item, i) => {
                  return (
                    <View style={styles.locationContainer} key={i}>
                      <View style={styles.locationListContainer}>
                        {item.name != 'WORK' ? (
                          <Icon name="home" style={styles.Icon} />
                        ) : (
                          <Image
                            source={work}
                            resizeMode="contain"
                            style={{
                              width: DEVICE_HEIGHT > 600 ? 50 : 40,
                              height: DEVICE_HEIGHT > 600 ? 50 : 40,
                              marginRight: 5,
                            }}
                          />
                        )}
                        <View>
                          <Text style={styles.text}>{item.name}</Text>
                          <Text
                            style={[
                              styles.text,
                              {fontSize: DEVICE_HEIGHT > 600 ? 12 : 10},
                            ]}>
                            Address: {item.address}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.locationIconContainer}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('EditLocation', {
                              selectedAddress: {
                                address: item.address,
                                latitude: JSON.parse(item.lat),
                                longitude: JSON.parse(item.longi),
                              },
                              place: item.name,
                              location_id: item.location_id,
                            })
                          }>
                          <Image
                            source={edit}
                            style={styles.locationIcon}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.deleteFun(item)}>
                          <Image
                            source={trash}
                            style={styles.locationIcon}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
            </ScrollView>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => this.props.navigation.navigate('Places')}>
              <Text style={styles.primaryText}>Add New Location</Text>
            </TouchableOpacity>
            {loader && <Loader />}
          </View>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    locations: state.locationsReducer.locations,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getLocations,
      delLocation,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '5%',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  locationListContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '85%',
    overflow: 'hidden',
    marginRight: '5%',
  },
  Icon: {
    color: colors.locationiIcon,
    fontSize: DEVICE_HEIGHT > 600 ? 45 : 35,
    marginRight: 10,
    paddingLeft: 5,
  },
  text: {
    // color: colors.locationiIcon,
    fontSize: DEVICE_HEIGHT > 600 ? 14 : 12,
    width: '100%',
    fontFamily,
    marginBottom: 4,
  },
  locationIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // width: "10%",
    justifyContent: 'center',
  },
  locationIcon: {
    // fontSize: 20,
    marginRight: 0,
    width: 25,
    height: 25,
  },
  primaryBtn: {
    width: '90%',
    backgroundColor: colors.primary,
    marginTop: 10,
    borderRadius: 10,
    height: DEVICE_HEIGHT > 600 ? 55 : 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: DEVICE_HEIGHT > 600 ? 30 : 20,
  },
  primaryText: {
    color: colors.white,
    fontSize: DEVICE_HEIGHT > 600 ? 22 : 18,
    fontFamily,
  },
});
