import {
  AUTHENTICATED_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
//   GOOGLE_AUTH_SUCCESS,
//   GOOGLE_AUTH_FAIL,
//   FACEBOOK_AUTH_SUCCESS,
//   FACEBOOK_AUTH_FAIL,
  LOGOUT,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_SUCCESS,
//   GET_CART_DATA_START,
//   GET_CART_DATA_SUCCESS,
//   GET_CART_DATA_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
//   GET_DISCOUNTS,
} from "../actions/types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  //   error: null,
  user: null,
  //   cart: null,
  //   discounts: [],
  // loading: false,
  // cartLoading: false,
  //   cartError: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case AUTHENTICATED_START:
      return {
        error: null,
        // loading: true,
      };

    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        // loading: false,
        error: null,
      };
    case AUTHENTICATED_FAIL:
      localStorage.removeItem("access");
      return {
        ...state,
        isAuthenticated: false,
        // loading: false,
        error: action.error,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("access", payload.access);
      localStorage.setItem("refresh", payload.refresh);
      return {
        ...state,
        isAuthenticated: true,
        // loading: false,
        error: null,
        access: payload.access,
        refresh: payload.refresh,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        // loading: false,
        error: null,
      };
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    // case GET_CART_DATA_START:
    //   return {
    //     ...state,
    //     // cartLoading: true,
    //   };
    // case GET_CART_DATA_SUCCESS:
    //   return {
    //     ...state,
    //     cart: payload,
    //     // cartLoading: false,
    //   };
    // case GET_DISCOUNTS:
    //   return {
    //     ...state,
    //     discounts: payload,
    //   };
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        // loading: false,
        error: null,
      };
    case UPDATE_USER_PROFILE_FAIL:
      return {
        ...state,
        isAuthenticated: true,
        // loading: false,
        error: action.error,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
      };
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_FAIL:
    case LOGOUT:
      return {
        ...state,
        // loading: false,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
        error: action.error,
      };
    // case GET_CART_DATA_FAIL:
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
}
