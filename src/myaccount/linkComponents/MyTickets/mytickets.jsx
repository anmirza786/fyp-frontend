import React from "react";

import "./mytickets.css";

import { NavLink } from "react-router-dom";

import ActiveTickets from "./ActiveTickets/activetickets.jsx";

import PostTickets from "./PostTickets/posttickets.jsx";

const MyTickets = (props) => {
  return (
    <section className="mytickets">
      <div>
        <NavLink activeClassName="ticketActiveNav" to="/myaccount/tickets/activetickets">
          <button>Active</button>
        </NavLink>
        <NavLink activeClassName="ticketActiveNav" to="/myaccount/tickets/pasttickets">
          <button>Past</button>
        </NavLink>
      </div>
      <div className="ticketsdetail">
        <div className="row tickets-head m-0">
          <div className="col-2 col-lg-1">
            <h1>id</h1>
          </div>
          <div className="col-2 col-lg-2">
            <h1>Product</h1>
          </div>
          <div className="col col-lg-7">
            <h1>Competition Name</h1>
          </div>
          <div className="col-2 col-lg-2">
            <h1>Ticket(#)</h1>
          </div>
          {/* <div className="col-3 col-lg-2">
            <h1>Status</h1>
          </div> */}
        </div>
        <>{props.children}</>
      </div>
    </section>
  );
};
export default MyTickets;
