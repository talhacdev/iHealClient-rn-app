import {store_url} from '../config/config';
import axios from 'axios';
import {Alert} from 'react-native';

export const fcmToken = data => {
  return dispatch => {
    axios(`${store_url}/Authentication/updatetoken`, {
      method: 'post',
      data,
    }).then(res => {});
  };
};
export const getUserData = data => {
  return dispatch => {
    axios(`${store_url}/Authentication/get_user_data`, {
      method: 'post',
      data,
    }).then(res => {
      if (res.data.status == true && res.data.data.u_id !== undefined) {
        if (res.data.data.user_status == 0) {
          dispatch({
            type: 'PROFILE',
            user: res.data.data,
          });
        } else {
          Alert.alert(
            'iHeal',
            'You have Been Blocked.\nPlease Contact our customer support.',
          );
          dispatch({
            type: 'PROFILE',
          });
        }
      } else if (
        res.data.status == false &&
        res.data.message == 'Invalid Session or Mobile no.'
      ) {
        dispatch({
          type: 'SESSION',
          sessionExpired: true,
        });
      }
    });
  };
};
export const updateProfile = (data, rsl, rej) => {
  return dispatch => {
    axios(`${store_url}/Authentication/update_profile`, {
      method: 'post',
      data,
    })
      .then(res => {
        console.log('res', JSON.stringify(res));
        if (res.data.status == true && res.data.data.u_id !== undefined) {
          dispatch({
            type: 'PROFILE',
            user: res.data.data,
          });
          rsl();
        } else if (
          res.data.status == false &&
          res.data.message == 'Invalid Session or Mobile no.'
        ) {
          dispatch({
            type: 'SESSION',
            sessionExpired: true,
          });
        } else if (res.data.status == false) {
          rej(res.data.message);
        }
      })
      .catch(err => {
        console.log('err', err);
        rej(err.message);
      });
  };
};

export const updatePassword = (data, rsl, rej) => {
  return dispatch => {
    axios(`${store_url}/Authentication/update_password`, {
      method: 'post',
      data,
    })
      .then(res => {
        if (res.data.status == true) {
          rsl();
        } else if (
          res.data.status == false &&
          res.data.message == 'Invalid Session or Mobile no.'
        ) {
          dispatch({
            type: 'SESSION',
            sessionExpired: true,
          });
        } else if (res.data.status == false) {
          rej(res.data.message);
        }
      })
      .catch(err => {
        rej(err.message);
      });
  };
};

export const deletePhoto = (data, rsl, rej) => {
  return dispatch => {
    axios(`${store_url}/Authentication/delete_pic`, {
      method: 'post',
      data,
    })
      .then(res => {
        if (res.data.status == true) {
          rsl();
        } else if (
          res.data.status == false &&
          res.data.message == 'Invalid Session or Mobile no.'
        ) {
          dispatch({
            type: 'SESSION',
            sessionExpired: true,
          });
        } else if (res.data.status == false) {
          rej(res.data.message);
        }
      })
      .catch(err => {
        rej(err.message);
      });
  };
};

export const logout = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch(
        {
          type: 'PROFILE',
        },
        200,
      );
    });
  };
};
