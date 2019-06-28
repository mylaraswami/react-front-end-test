import * as actionType from "./action-type";
import { 
  pageLoading, 
  alertError, 
  alertSuccess 
} from "./alert-actions";
import User from "../tools/user-service";
import axios from 'axios';
import { appConstants } from '../helpers/constants';

export const userLogin = (token, username) => {
  const type = actionType.IS_LOGIN;
  User.setToken(token);
  User.setUserInfo('email');
  return { type, token };
};

export const userClear = () => {
  const type = actionType.IS_LOGIN;
  User.clearData();
  return { type, token: null };
};

export function LoginSuccess(response){
  return {
      type: actionType.LOGIN_SUCCESS,
      payload: {
        response
      }
  }
}

export function LoginError(response){
  return {
      type: actionType.LOGIN_ERROR,
      payload: {
        response
      }
  }
}

export function signUpSuccess(response){
  return {
      type: actionType.SIGNUP_SUCCESS,
      payload: {
        response
      }
  }
}

export function signUpError(response){
  return {
      type: actionType.SIGNUP_ERROR,
      payload: {
        response
      }
  }
}

export function findFactorialSuccess(response){
  return {
      type: actionType.FIND_FACTORIAL_SUCCESS,
      payload: {
        response
      }
  }
}

export function findFactorialError(response){
  return {
      type: actionType.FIND_FACTORIAL_ERROR,
      payload: {
        response
      }
  }
}
// export const userLoginSubmit = (values) => {
//   return dispatch => {
//     dispatch(pageLoading());
//     if (User.loginAttempt(values.email, values.password)) {
//       dispatch(userLogin(Math.random(), values.email));
//       return dispatch(
//         alertSuccess("Registration Successfull...")
//       );
//     }
//     return dispatch(alertError("Error!!!"));
//   };
// };

export function  userLoginSubmit(values) {
  return  function (dispatch) {
    axios.post(`${appConstants.WEB_SERVICE_URL}/login`,values)
      .then(function (response) {
        // if api calling is return success then response is dispatch to reducer via createSuccess method
        dispatch(alertSuccess('Successfull login'))
        User.setUserInfo(values.email)
        User.setToken(response.data.token)
        dispatch(LoginSuccess(response))
      })
    .catch(error => { 
      // otherwise createError will handle error
        dispatch(alertError("Error!!!"));
     });
  };
}

export function  userSignUpSubmit(values) {
  return  function (dispatch) {
    axios.post(`${appConstants.WEB_SERVICE_URL}/register`,values)
      .then(function (response) {
        // if api calling is return success then response is dispatch to reducer via createSuccess method
        dispatch(alertSuccess("Registration Successfull..."))
        User.setUserInfo(values.email)
         User.setToken(response.data.token)
        dispatch(signUpSuccess(response.data))
      })
    .catch(error => { 
      // otherwise createError will handle error
        dispatch(alertError("Error!!!"));
     });
  };
}

export function  findFactorialValue(value) {
  let num = {
    number: parseInt(value)
  }
  
  let authToken = localStorage.getItem('token')
  
   var header = {
        'Content-Type': 'application/json',
        'authorization': authToken 
    }

  return  function (dispatch) {
    axios.post(`${appConstants.WEB_SERVICE_URL}/calculation`,num, {headers: header})
      .then(function (response) {
        // if api calling is return success then response is dispatch to reducer via createSuccess method
        dispatch(findFactorialSuccess(response.data))
      })
    .catch(error => { 
      // otherwise createError will handle error
        dispatch(alertError("Error!!!"));
     });
  };
}

export const userLogout = () => {
  return dispatch => {
    /*dispatch(userPassword("1"));*/
    dispatch(alertSuccess("Logout!!!"));
    dispatch(userClear());
  };
};
