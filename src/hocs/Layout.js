import React, { useEffect } from "react";
import IndexNavbar from "components/Navbars/IndexNavbar";
// import { useEffect } from "react";
import { connect } from "react-redux";
import { checkAuthenticated, load_user } from "../actions/auth";

const Layout = (props) => {
  useEffect(() => {
    props.checkAuthenticated();
    props.load_user();
  });
  return (
    <div>
      <IndexNavbar />
      {props.children}
    </div>
  );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);
