import React from "react";
import "./optionBar.css";
import { logout } from "../../actions/auth";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const OptionBar = ({ logout }) => {
  return (
    <aside className="my-acount-sideNav">
      <ul>
        <NavLink
          className="my-acount-sideNav-links"
          activeClassName="my-acount-sideNav-activelink"
          to="/profile/acountdetail"
        >
          <li className="sidenav-items">
            <i className="fas fa-user-circle"></i> Account Details
          </li>
        </NavLink>
        <NavLink
          className="my-acount-sideNav-links"
          activeClassName="my-acount-sideNav-activelink"
          to="/profile/tickets"
        >
          <li>
            <i className="fas fa-ticket-alt fa-alt"></i> My Tickets
          </li>
        </NavLink>
        <NavLink
          className="my-acount-sideNav-links"
          activeClassName="my-acount-sideNav-activelink"
          to="/profile/transaction"
        >
          <li>
            <i className="fas fa-coins"></i> My Transactions
          </li>
        </NavLink>
        <NavLink
          activeClassName="my-acount-sideNav-activelink"
          className="my-acount-sideNav-links"
          to="/profile/wallet"
        >
          <li>
            <i className="fas fa-wallet fa-alt"></i> My Wallet
          </li>
        </NavLink>
        <NavLink
          className="my-acount-sideNav-links logout"
          to="/"
          onClick={() => logout()}
        >
          <li>
            <i className="fas fa-sign-out-alt"></i> Logout
          </li>
        </NavLink>
      </ul>
    </aside>
  );
};

export default connect(null, { logout })(OptionBar);
