import React from "react";

import "./linkComponenets.css";

import AccountDetail from "./AccountDetail/AccountDetail.jsx";

import Wallet from "./Wallet/wallet.jsx";

import Transections from "./Transections/transections.jsx";

import MyTickets from "./MyTickets/mytickets.jsx";



const LinkComponenets = (props) => {

  return ( 
    <section className="my-account-components">
      {props.children} 
    </section>
  );
};
export default LinkComponenets;
