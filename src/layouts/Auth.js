import React, { Component } from "react";
import { Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import Navbar from "../components/Navbars/IndexNavbar";
import FooterSmall from "../components/Footers/FooterSmall";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import ResetPassword from "../views/auth/ResetPassword";
import ResetPasswordConfirm from "../views/auth/ResetPasswordConfirm";
import Activete from "../views/auth/Activete";
import Img from "../assets/img/register_bg_2.png";

class Auth extends Component {
  render() {
    return (
      <>
        <Navbar transparent />
        <main>
          <section className="relative w-full h-full py-40 min-h-screen">
            <div
              className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
              style={{
                backgroundImage: "url(" + Img + ")",
              }}
            ></div>
            <Switch>
              <Route path="/auth/login" exact component={Login} />
              <Route path="/auth/register" exact component={Register} />
              <Route
                path="/auth/reset-password"
                exact
                component={ResetPassword}
              />
              <Route
                path="/auth/password/reset/confirm/:uid/:token"
                exact
                component={ResetPasswordConfirm}
              />
              <Route
                path="/auth/activate/:uid/:token"
                exact
                component={Activete}
              />
              <Redirect from="/auth" to="/auth/login" />
            </Switch>
            <FooterSmall absolute />
          </section>
        </main>
      </>
    );
  }
}

export default Auth;
