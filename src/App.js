import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts
import ShoppingCart from "./views/cart/cart";
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import HowToPlay from "views/how-to-play";
import Competitions from "views/Competitions";
import Winners from "views/Winners";
import Cart from "views/Cart";
import Competition from "views/SingleCompetition/Ticket/ticket";
import { Redirect } from "react-router-dom";
import Layout from "./hocs/Layout";
import ProfileTemplate from "views/ProfileTemplate";
import Wallet from "myaccount/linkComponents/Wallet/wallet";
import AccountDetail from "myaccount/linkComponents/AccountDetail/AccountDetail";
import PrivateRoute from "hocs/PrivateRoute";
import ScrollToTop from "hocs/ScrollToTop";
import Order from "views/order/Order";

const App = (props) => {
  return (
    <Layout>
      <ScrollToTop>
        <Switch>
          {/* add routes with layouts */}
          <Route path="/admin" component={Admin} />
          <Route path="/auth" component={Auth} />
          {/* add routes without layouts */}
          <Route path="/landing" exact component={Landing} />
          <Route path="/howtoplay" exact component={HowToPlay} />
          <Route path="/competitions" exact component={Competitions} />
          <Route path="/competitions/:id" exact component={Competition} />
          <Route path="/winners" exact component={Winners} />
          {/* <Route path="/cart" exact component={Cart} /> */}
          <Route path="/" exact component={Index} />
          <Route exact path="/cart" component={ShoppingCart} />
          <Route exact path="/order" component={Order} />
          {/* add redirect for first page */}
          <Route path="/profile" component={Profile} />
          <PrivateRoute exact path="/profile" component={ProfileTemplate} />
          <Redirect from="*" to="/" />

          <Route
            exact
            path="/profile/acountdetail"
            render={() => {
              return (
                <ProfileTemplate>
                  <AccountDetail />
                </ProfileTemplate>
              );
            }}
          />
          {/* <Route
          exact
          path="/profile/tickets"
          render={() => {
            return (
              <ProfileTemplate>
                <Tickets />
              </ProfileTemplate>
            );
          }}
        /> */}
          {/* <Route
          exact
          path="/profile/tickets/activetickets"
          render={() => {
            return (
              <ProfileTemplate>
                <Tickets>
                  <ActiveTickets />
                </Tickets>
              </ProfileTemplate>
            );
          }}
        /> */}

          {/* <Route
          exact
          path="/profile/tickets/pasttickets"
          render={() => {
            return (
              <ProfileTemplate>
                <Tickets>
                  <PastTickets />
                </Tickets>
              </ProfileTemplate>
            );
          }}
        /> */}
          {/* <Route
          exact
          path="/profile/transaction"
          render={() => {
            return (
              <ProfileTemplate>
                <Transaction />
              </ProfileTemplate>
            );
          }}
        /> */}

          <Route
            exact
            path="/profile/wallet"
            render={() => {
              return (
                <ProfileTemplate>
                  <Wallet />
                </ProfileTemplate>
              );
            }}
          />
        </Switch>
      </ScrollToTop>
    </Layout>
  );
};

export default App;
