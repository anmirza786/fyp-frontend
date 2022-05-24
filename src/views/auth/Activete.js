import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import Form from "./form";
import { varify } from "../../actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
const Activate = ({ varify, isAuthenticated, match }) => {
  const [varified, setVarified] = useState(false);

  const verify_account = (e) => {
    // e.preventDefault();
    const uid = match.params.uid;
    const token = match.params.token;
    varify(uid, token);
    setVarified(true);
  };
  if (varified) {
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
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-center mt-6">
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                    onClick={verify_account}
                  >
                    Activate Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default connect(null, { varify })(Activate);
