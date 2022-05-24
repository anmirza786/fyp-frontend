import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

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

const App = (props) => {
  return (
    <Layout>
      <Switch>
        {/* add routes with layouts */}
        <Route path="/admin" component={Admin} />
        <Route path="/auth" component={Auth} />
        {/* add routes without layouts */}
        <Route path="/landing" exact component={Landing} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/howtoplay" exact component={HowToPlay} />
        <Route path="/competitions" exact component={Competitions} />
        <Route path="/competitions/:id" exact component={Competition} />
        <Route path="/winners" exact component={Winners} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/" exact component={Index} />
        {/* add redirect for first page */}
        <Redirect from="*" to="/" />
      </Switch>
    </Layout>
  );
};

export default App;
