import React from 'react';
import {View, Text} from 'react-native';
// import {showPopup} from '../../actions/app';

import {connect} from 'react-redux';

const LoadingScreen = props => {
  const checkpopup = async () => {
    try {
      setLoading(true);
      const {phone_no, session} = user;
      const res = showPopup(phone_no, session);

      if (res) {
        setLoading(false);

        navigation.navigate('Rating');
      } else {
        setLoading(false);

        getCateg();
      }
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    const {user, navigation} = props;
    if (user) {
      if (user?.dp == '' || user?.name == '') {
        props.navigation.navigate('SettingStack');
      } else {
        props.navigation.navigate('Drawer');
      }
    } else {
      navigation.navigate('AuthStack');
    }
    // user !== undefined
    //   ? navigation.navigate('Drawer')
    //   : navigation.navigate('AuthStack');
  }, []);
  return <View />;
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.authReducer.user,
  };
};

export default connect(
  mapStateToProps,
  null,
)(LoadingScreen);
