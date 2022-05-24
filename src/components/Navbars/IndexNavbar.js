/*eslint-disable*/
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// components

import IndexDropdown from "components/Dropdowns/IndexDropdown.js";
import { connect } from "react-redux";

import { logout } from "../../actions/auth";
import { NavLink } from "react-router-dom";

const Navbar = ({ logout, isAuthenticated }) => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  const guestLinks = () => (
    <Fragment>
      <li className="flex items-center">
        <IndexDropdown />
      </li>
    </Fragment>
  );
  const authLinks = () => (
    <Link to="/profile" className="flex items-center">
      <button
        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mb-0 ease-linear transition-all duration-150"
        type="button"
      >
        <i class="far fa-user mr-2"></i>
        My Account
      </button>
    </Link>
  );
  // const logoutHandler = () => {};
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              Gift Redeemer & Store
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <Link to="/competitions">
                  <a
                    className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    target="_blank"
                  >
                    Competitions
                    {/* <span className="lg:hidden inline-block ml-2">Share</span> */}
                  </a>
                </Link>
              </li>

              <li className="flex items-center">
                <Link to="/HowToPlay">
                  <a
                    className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    target="_blank"
                  >
                    How to Play
                  </a>
                </Link>
              </li>

              <li className="flex items-center">
                <Link to="/winners">
                  <a
                    className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    target="_blank"
                  >
                    Winners
                  </a>
                </Link>
              </li>
              {isAuthenticated ? authLinks() : guestLinks()}
              <li className="flex items-center">
                <Link to="/cart">
                  <a
                    className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    target="_blank"
                    style={{ fontSize: "20px" }}
                  >
                    <i class="fas fa-shopping-cart"></i>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(Navbar);
