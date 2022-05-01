import React, {useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {walk} from '../../assests';
import colors from '../../assests/styles';
import AsyncStorage from '@react-native-community/async-storage';

const fontFamily = colors.font;

function WalkthroughScreen({navigation}) {
  useEffect(() => {
    storeData('1');
  });

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@storage_Key', value);
      setTimeout(function() {
        navigation.navigate('PhoneInput');
      }, 2000);
    } catch (e) {
      console.log('ERROR: ', e);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PhoneInput')}
      style={styles.container}>
      <View
        style={{
          //   backgroundColor: 'pink',
          marginTop: 100,
          marginBottom: 20,
          marginLeft: 14,
          marginRight: 14,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', fontFamily}}>
          Welcome to
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#2ed7d0',
            fontFamily,
          }}>
          iHeal
        </Text>
      </View>
      <View
        style={{
          //   backgroundColor: 'pink',
          marginLeft: 14,
          marginRight: 14,
        }}>
        <Text style={{fontSize: 11, color: '#9e9e9e', fontFamily}}>
          Your one stop solution to all of your nursing care, Your one stop
          solution to all of your nursing care, Your one stop solution to all of
          your nursing care, Your one stop solution to all of your nursing care,
          Your one stop solution to all of your nursing care, Your one stop
          solution to all of your nursing care, Your one stop solution to all of
          your nursing care.
        </Text>
      </View>
      <View
        style={{
          //   backgroundColor: 'pink',
          position: 'absolute',
          bottom: -40,
          right: 0,
        }}>
        <Image
          style={{resizeMode: 'contain', width: 280, height: 450}}
          source={walk}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default WalkthroughScreen;
