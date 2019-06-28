import * as actionType from "../actions/action-type";
const initialState = {
  response: {},
  loading: false,
  success: false,
  error: false
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SIGNUP_SUCCESS:
      return {
        ...state,
        response: action.payload.response,
        success: true,
        error: false
      };

     case actionType.SIGNUP_ERROR:
      return {
        ...state,
        response: action.payload.response,
        success: false,
        error: true
      };

    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        response: action.payload.response,
        success: true,
        error: false
      };

     case actionType.LOGIN_ERROR:
      return {
        ...state,
        response: action.payload.response,
        success: false,
        error: true
      };

    case actionType.FIND_FACTORIAL_SUCCESS:
      return{
        ...state,
        response:  action.payload.response
      }

    case actionType.FIND_FACTORIAL_ERROR:
      return{
        ...state,
        response:  action.payload.response
      }

    case actionType.IS_LOGIN:
      return {
        ...state,
        loading: false,
        success: false,
        error: false,
        token: action.token
      };
    default:
      return state;
  }
};

export default userReducers;
