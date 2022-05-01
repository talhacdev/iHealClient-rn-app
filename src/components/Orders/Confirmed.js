import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';

import colors from '../../assests/styles';
import Logo from '../../assests/header_logo.jpg';
import confirm from '../../assests/confirm.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

export default class Confirmed extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Order Confirmed</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.popToTop()}
          style={{alignItems: 'center'}}>
          <Image
            source={confirm}
            style={{
              width:
                DEVICE_HEIGHT > 600 ? DEVICE_WIDTH * 0.75 : DEVICE_WIDTH * 0.7,
              height:
                DEVICE_HEIGHT > 600 ? DEVICE_WIDTH * 0.75 : DEVICE_WIDTH * 0.7,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.text}>Thank you for choosing</Text>
        <Image
          source={Logo}
          style={{
            width: 40,
            height: DEVICE_HEIGHT > 600 ? 45 : 40,
          }}
          resizeMode="contain"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    color: colors.number,
    fontSize: DEVICE_HEIGHT > 600 ? 30 : 22,
    marginBottom: DEVICE_HEIGHT > 600 ? 5 : 0,
    marginTop: DEVICE_HEIGHT > 600 ? 15 : 10,
    fontFamily: colors.font,
    alignSelf: 'center',
  },
});
