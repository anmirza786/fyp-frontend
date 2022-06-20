import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import Form from "./form";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
const Login = ({ login, isAuthenticated, error }) => {
  // state = {
  //   data: {
  //     email: "",
  //     password: "",
  //   },
  // };
  // doSubmit = async () => {
  //   const data = { ...this.state.data };
  //   login(data.email, data.password);
  // console.log(this.state.data);

  // console.log(login(this.state.data.email, this.state.data.password));
  // };
  // render() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    try {
      login(email, password);
    } catch (er) {}
  };
  if (isAuthenticated) {
    return <Redirect from="*" to="/" />;
  }
  return (
    <div>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6
                    className="text-blueGray-500 text-sm font-bold"
                    id="signin"
                  >
                    Sign in with
                  </h6>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      name="email"
                      // value={this.state.data.email}
                      // onChange={this.handelChange}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      name="password"
                      // value={this.state.data.password}
                      // onChange={this.handelChange}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="text-center mt-6">
                    {error != null || error != undefined
                      ? Object.keys(error.data).map((key, index) => (
                          <ul key={index} style={{ paddingLeft: "10px" }}>
                            <li
                              style={{
                                color: "red",
                                fontSize: "12px",
                                listStyleType: "square",
                              }}
                            >
                              <span>
                                <strong>{key.toUpperCase()}</strong> :{" "}
                              </span>
                              <span>
                                <strong>{error.data[key]}</strong>
                              </span>
                            </li>
                          </ul>
                        ))
                      : null}
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link to="/auth/reset-password" className="text-blueGray-200">
                  <small>Forgot Password</small>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
});
export default connect(mapStateToProps, { login })(Login);
