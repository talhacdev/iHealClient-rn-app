import { store_url } from '../config/config';
import axios from 'axios';

export const getVehicles = (phone, session, rsl, rej) => {
    return dispatch => {
        const formData = new FormData();
        formData.append("phone_no", phone)
        formData.append("session_key", session)

        axios(`${store_url}/Authentication/get_vehicles`, {
            method: 'post',
            data: formData,
        })
            .then((res) => {

                if (res.data.status == true && res.data.data.length > 0) {
                    dispatch({
                        type: 'GET_VEHICLES',
                        vehicles: res.data.data
                    })
                    rsl()
                }
                else if (res.data.status == false && res.data.message == 'Invalid Session or Mobile no.') {
                    dispatch({
                        type: 'SESSION',
                        sessionExpired: true
                    })
                }
                else if (res.data.status == false && res.data.message == "No Data found.") {
                    dispatch({
                        type: 'GET_VEHICLES',
                    })
                    rej(res.data.message);
                }
            })
            .catch(err => rej(err.message))
    }
}
export const getStates = (phone, session, rsl, rej) => {
    return dispatch => {

        const formData = new FormData();
        formData.append("phone_no", phone)
        formData.append("session_key", session)

        axios(`${store_url}/Authentication/get_states`, {
            method: 'post',
            data: formData,
        })
            .then((res) => {

                if (res.data.status == true && res.data.data.length > 0) {
                    rsl(res.data.data)
                }
                else if (res.data.status == false && res.data.message == 'Invalid Session or Mobile no.') {
                    dispatch({
                        type: 'SESSION',
                        sessionExpired: true
                    })
                }
                else {
                    rej(res.data.message);
                }
            })
            .catch(err => rej(err.message))
    }
}

export const getMake = (phone, session, rsl, rej) => {
    return dispatch => {

        const formData = new FormData();
        formData.append("phone_no", phone)
        formData.append("session_key", session)

        axios(`${store_url}/Authentication/get_all_car_made`, {
            method: 'post',
            data: formData,
        })
            .then((res) => {
                if (res.data.status == true && res.data.data.length > 0) {
                    rsl(res.data.data)
                }
                else if (res.data.status == false && res.data.message == 'Invalid Session or Mobile no.') {
                    dispatch({
                        type: 'SESSION',
                        sessionExpired: true
                    })
                }
                else {
                    rej(res.data.message);
                }
            })
            .catch(err => rej(err.message))
    }
}

export const getModel = (phone, session, made_id, rsl, rej) => {
    return dispatch => {
        const formData = new FormData();
        formData.append("phone_no", phone)
        formData.append("session_key", session)
        formData.append("made_id", made_id)

        axios(`${store_url}/Authentication/get_all_car_model`, {
            method: 'post',
            data: formData,
        })
            .then((res) => {

                if (res.data.status == true && res.data.data.length > 0) {
                    rsl(res.data.data)
                }
                else if (res.data.status == false && res.data.message == 'Invalid Session or Mobile no.') {
                    dispatch({
                        type: 'SESSION',
                        sessionExpired: true
                    })
                }
                else if (res.data.status == false && res.data.message == "No Data found.") {
                    rej(res.data.message);
                }
            })
            .catch(err => rej(err.message))
    }
}
export const addVehicle = (data, rsl, rej) => {
    return dispatch => {
        axios(`${store_url}/Authentication/insert_vehicle`, {
            method: 'post',
            data,
            // headers: {
            //     'Content-Type': 'multipart/form-data',
            // }
        })
            .then((res) => {

                if (res.data.status == true) {
                    rsl(res.data.message)
                }
                else if (res.data.status == false && res.data.message == 'Invalid Session or Mobile no.') {
                    dispatch({
                        type: 'SESSION',
                        sessionExpired: true
                    })
                }
                else {
                    rej(res.data.message)
                }
            })
            .catch(err => rej(err.message))
    }
}
export const updateVehicle = (data, rsl, rej) => {
    return dispatch => {
        axios(`${store_url}/Authentication/update_vehicle`, {
            method: 'post',
            data,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then((res) => {

                if (res.data.status == true) {
                    rsl(res.data.message)
                }
                else if (res.data.status == false && res.data.message == 'Invalid Session or Mobile no.') {
                    dispatch({
                        type: 'SESSION',
                        sessionExpired: true
                    })
                }
                else{
                    rej(res.data.message)
                }
            })
            .catch(err => rej(err.message))
    }
}
export const delVehicle = (phone, session, vehicle_id, rsl, rej) => {
    return dispatch => {
        const formData = new FormData();
        formData.append("phone_no", phone)
        formData.append("session_key", session)
        formData.append("vehicle_id", vehicle_id)
        axios(`${store_url}/Authentication/delete_vehicle`, {
            method: 'post',
            data: formData,
        })
            .then((res) => {

                if (res.data.status == true) {
                    rsl(res.data.message)
                }
                else if (res.data.status == false && res.data.message == 'Invalid Session or Mobile no.') {
                    dispatch({
                        type: 'SESSION',
                        sessionExpired: true
                    })
                }
                else if (res.data.status == false) {
                    rej(res.data.message);
                }
            })
            .catch(err => rej(err.message))
    }
}
export const getVehicleHistory = (phone, session, vehicle_id, rsl, rej) => {
    return dispatch => {
        const formData = new FormData();
        formData.append("phone_no", phone)
        formData.append("session_key", session)
        formData.append("vehicle_id", vehicle_id)
        axios(`${store_url}/Authentication/get_vehicle_history`, {
            method: 'post',
            data: formData,
        })
            .then((res) => {
                if (res.data.status == true) {
                    rsl(res.data)
                }
                else if (res.data.status == false && res.data.message == 'Invalid Session or Mobile no.') {
                    dispatch({
                        type: 'SESSION',
                        sessionExpired: true
                    })
                }
                else if (res.data.status == false) {
                    rej(res.data.since_used);
                }
            })
            .catch(err => rej(err.message))
    }
}
