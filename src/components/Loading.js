import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

export default (LoadIndicator = ({visible}) => (
  <ActivityIndicator
    animating
    color="#1CD5CD"
    style={visible ? loader.centering : loader.hideIndicator}
    size="large"
  />
));
const loader = StyleSheet.create({
  centering: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 70,
    backgroundColor: '#fff',
    opacity: 0.8,
  },
  hideIndicator: {
    position: 'absolute',
    top: -100,
    opacity: 0,
  },
});
