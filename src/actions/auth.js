import axios from "axios";
import {
  AUTHENTICATED_START,
  LOGIN_SUCCESS,
  USER_LOADED_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  GOOGLE_AUTH_SUCCESS,
  FACEBOOK_AUTH_SUCCESS,
  GOOGLE_AUTH_FAIL,
  FACEBOOK_AUTH_FAIL,
  LOGOUT,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  GET_CART_DATA_START,
  GET_CART_DATA_SUCCESS,
  GET_CART_DATA_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  ACCOUNT_ACTIVATION_CONFIRM_FAIL,
  ACCOUNT_ACTIVATION_CONFIRM_SUCCESS,
  GET_DISCOUNTS,
} from "./types";

// REQUEST VARIABLE
import { REQUEST_URL } from "./Constant";

export const checkAuthenticated = () => async (dispatch) => {
  dispatch({
    type: AUTHENTICATED_START,
  });
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({ token: localStorage.getItem("access") });
    try {
      const res = await axios.post(
        REQUEST_URL + `/auth/jwt/verify/`,
        body,
        config
      );
      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
        dispatch(getCartData());
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const googleAuthenticate = (state, code) => async (dispatch) => {
  if (code && !localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const details = {
      // 'state': state,
      code: code,
    };
    const formBody = Object.keys(details)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
      )
      .join("&");
    try {
      const res = await axios.post(
        `${REQUEST_URL}/auth/o/google-oauth2/?${formBody}`,
        config
      );
      console.log(res, "googleeeeeeeeeeee");
      dispatch({
        type: GOOGLE_AUTH_SUCCESS,
        payload: res.data,
      });
      dispatch(load_user());
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: GOOGLE_AUTH_FAIL,
      });
      // console.log(error.response,"google auth error")
    }
  }
};

export const facebookAuthenticate = (state, code) => async (dispatch) => {
  if (state && code && !localStorage.getItem("access")) {
    console.log("State: " + state);
    console.log("Code: " + code);
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const details = {
      state: state,
      code: code,
    };
    const formBody = Object.keys(details)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
      )
      .join("&");
    try {
      const res = await axios.post(
        `${REQUEST_URL}/auth/o/facebook/?${formBody}`,
        config
      );
      console.log(res, "google auth response");
      dispatch({
        type: FACEBOOK_AUTH_SUCCESS,
        payload: res.data,
      });
      dispatch(load_user());
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: FACEBOOK_AUTH_FAIL,
      });
      console.log(error.response, "google auth error");
    }
  }
};
export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: AUTHENTICATED_START,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(
      REQUEST_URL + `/auth/jwt/create/`,
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(load_user());
  } catch (error) {
    console.log(error, "error");
    dispatch({
      error: error.response,
      type: LOGIN_FAIL,
    });
  }
};

export const signup =
  (first_name, last_name, email, password, re_password, code) =>
  async (dispatch) => {
    dispatch({
      type: AUTHENTICATED_START,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      first_name,
      last_name,
      email,
      password,
      re_password,
      code,
    });
    // const data = new FormData();
    // data.append("name", name);
    // data.append("email", email);
    // data.append("password", password);
    // data.append("re_password", re_password);
    // data.append("code", code);
    await axios
      .post(REQUEST_URL + `/api/auth/users/`, body, config)
      .then((res) => {
        dispatch(login(email, password));
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data,
        });
        dispatch(load_user());
      })
      .catch((error) => {
        dispatch({
          error: error.response,
          type: SIGNUP_FAIL,
        });
      });
  };

export const update_profile =
  (phone, address, town, postcode) => async (dispatch) => {
    console.log(phone, address, town, postcode);
    dispatch({
      type: AUTHENTICATED_START,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({ phone, address, town, postcode });
    try {
      const res = await axios.put(
        REQUEST_URL + `/api/profile/update`,
        body,
        config
      );
      if (res.data.profile && res.data.useremail && res.data.first_name) {
        dispatch({
          type: UPDATE_USER_PROFILE_SUCCESS,
        });
        dispatch(load_user());
      } else {
        dispatch({
          type: UPDATE_USER_PROFILE_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        error: error.response,
        type: UPDATE_USER_PROFILE_FAIL,
      });
    }
  };

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    try {
      const res = await axios.get(REQUEST_URL + `/auth/users/`, config);
      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      });
      dispatch(getCartData());
    } catch (err) {
      console.log(err, "this is error while loading user");
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("access");
  localStorage.removeItem("expirationDate");
  dispatch({
    type: LOGOUT,
  });
};

// export const checkAuthTimeout = expirationTime => {
//     return dispatch => {
//         setTimeout(() => {
//             dispatch(logout());
//         }, expirationTime * 1000)
//     }
// }
export const getCartData = () => async (dispatch) => {
  dispatch({
    type: GET_CART_DATA_START,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  await axios
    .get(REQUEST_URL + `/api/carts/active`, config)
    .then((res) => {
      if (res.data.items.length > 0) {
        dispatch({
          type: GET_CART_DATA_SUCCESS,
          payload: res.data.items,
        });
      } else {
        dispatch({
          type: GET_CART_DATA_FAIL,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
      dispatch({
        type: GET_CART_DATA_FAIL,
      });
    });
};

export const getDiscounts = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  await axios.get(REQUEST_URL + `/api/carts/discounts`, config).then((res) => {
    console.log(res);
    dispatch({
      type: GET_DISCOUNTS,
      payload: res.data,
    });
  });
};

export const reset_password = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });
  try {
    const res = await axios.post(
      REQUEST_URL + `/api/auth/users/reset_password/`,
      body,
      config
    );
    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    });
  } catch (error) {
    dispatch({
      error: error.response,
      type: PASSWORD_RESET_FAIL,
    });
  }
};

export const reset_password_confirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });
    console.log(body);
    try {
      await axios.post(
        REQUEST_URL + `/auth/users/reset_password_confirm/`,
        body,
        config
      );

      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS,
      });
    } catch (error) {
      dispatch({
        error: error.response,
        type: PASSWORD_RESET_CONFIRM_FAIL,
      });
    }
  };
