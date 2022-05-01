import {store_url} from '../config/config';
import axios from 'axios';
import auth from '@react-native-firebase/auth';

export const checkVersion = (data, rsl, rej) => {
  return dispatch => {
    axios(`${store_url}/Authentication/UpdateVersion`, {
      method: 'post',
      data,
    }).then(res => {
      if (
        res.data.status == false &&
        res.data.data !== undefined &&
        res.data.data.length > 1
      ) {
        rsl(res.data.data);
      }
    });
  };
};

export const fcmToken = data => {
  return dispatch => {
    axios(`${store_url}/Authentication/updatetoken`, {
      method: 'post',
      data,
    });
  };
};
export const checkuser = (phone, rsl, rej) => {
  return dispatch => {
    let data = new FormData();
    data.append('phone_no', phone);
    axios(`${store_url}/Authentication/check_user`, {
      method: 'post',
      data,
    })
      .then(res => {
        rsl(res.data.status);
      })
      .catch(err => rej(err.message));
  };
};

export const authState = (rsl, rej) => {
  return dispatch => {
    auth().onAuthStateChanged(user => {
      if (user) {
        rsl(user);
        try {
          auth().signOut();
        } catch {}
      }
    });
  };
};

export const signInWithPhone = (phone, rsl, rej) => {
  return dispatch => {
    auth()
      .signInWithPhoneNumber(phone)
      .then(confirmResult => {
        rsl(confirmResult);
      })
      .catch(error => {
        rej(error.message);
      });
  };
};

export const confirmOTP = (otp, confirmation, rsl, rej) => {
  return dispatch => {
    confirmation.confirm(otp).catch(error => {
      rej(error.message);
    });
  };
};

export const signUp = (phone, password, rsl, rej) => {
  return async dispatch => {
    const formData = new FormData();
    formData.append('phone_no', phone);
    // formData.append('email', email);
    formData.append('password', password);
    // formData.append('ref_code', promo);
    console.log(formData);
    const res = await axios(`${store_url}/Authentication/signup`, {
      method: 'post',
      data: formData,
    })
      .then(res => {
        if (
          res.data.status == true &&
          res.data.data !== undefined &&
          res.data.data[0].u_id
        ) {
          dispatch({
            type: 'SIGNUP',
            user: res.data.data[0],
          });
          rsl();
        } else {
          rej(res.data.message);
        }
      })
      .catch(err => rej(err.message));
  };
};

export const signIn = (phone, password, rsl, rej) => {
  return dispatch => {
    const formData = new FormData();
    formData.append('phone_no', phone);
    formData.append('password', password);

    axios(`${store_url}/Authentication/login_user`, {
      method: 'post',
      data: formData,
    })
      .then(res => {
        console.log(res);
        if (
          res.data.status == true &&
          res.data.data !== undefined &&
          res.data.data.u_id
        ) {
          if (res.data.data.user_privilidge == 0) {
            dispatch({
              type: 'LOGIN',
              user: res.data.data,
            });
            rsl(res.data.data);
          } else {
            rej(res.data.message);
          }
        } else {
          rej(res.data.message);
        }
      })
      .catch(err => rej(err.message));
  };
};
