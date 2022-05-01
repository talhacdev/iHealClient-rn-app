import React, {Component} from 'react';
import {Text, View, Alert, Dimensions} from 'react-native';

import {GOOLGE_MAPS_APIKEY} from '../../config/config';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import colors from '../../assests/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {height: DEVICE_HEIGHT} = Dimensions.get('window');

import Map from './Map';

export default class Places extends Component {
  state = {
    address: null,
    showMap: false,
    place: '',
    time: '',
    des: '',
    date: '',
    id: '',
    subId: '',
    name: '',
    from: '',
    item: null,
  };
  componentDidMount() {
    const place = this.props.navigation.getParam('place');
    const location_id = this.props.navigation.getParam('location_id');
    const time = this.props.navigation.getParam('time');
    const date = this.props.navigation.getParam('date');
    const des = this.props.navigation.getParam('des');
    const id = this.props.navigation.getParam('id');
    const subId = this.props.navigation.getParam('subId');
    const name = this.props.navigation.getParam('name');
    const from = this.props.navigation.getParam('from');
    const item = this.props.navigation.getParam('item');
    console.log(time);
    this.setState({time, date, des, id, subId, name, from, item});
    if (place) {
      this.setState({place});
    }
    if (location_id) {
      this.setState({location_id});
    }
  }
  move = () => {
    if (this.state.place) {
      this.props.navigation.push('EditLocation', {
        selectedAddress: this.state.selectedAddress,
        place: this.state.place,
        location_id: this.state.location_id,
      });
    } else {
      this.props.navigation.replace('AddLocation', {
        selectedAddress: this.state.selectedAddress,
      });
    }
  };
  render() {
    const item = this.props.navigation.getParam('item');
    return (
      <View style={{flex: 1}}>
        <Map
          navigation={this.props.navigation}
          place={this.state.place}
          location_id={this.state.location_id}
          time={this.state.time}
          des={this.state.des}
          date={this.state.date}
          id={this.state.id}
          name={this.state.name}
          subId={this.state.subId}
          from={this.state.from}
          item={item}
        />
      </View>
    );
  }
}
