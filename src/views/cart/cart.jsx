import React, { useState, useEffect } from "react";
import { REQUEST_URL } from "../../actions/Constant";
// import Loader from "react-loader-spinner";
import axios from "axios";
import "./cart.css";
import { Redirect, Link } from "react-router-dom";

// import Logo from "../../assets/logo.png";
// import England from "../../assets/england.png";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getCartData, getDiscounts } from "../../actions/auth";

const Cart = ({
  getCartData,
  getDiscounts,
  cart,
  discounts = [],
  isLoading,
}) => {
  const [userData, setUserData] = useState([]);
  let isLoader = true;
  let userCart = [];

  useEffect(() => {
    getUserData();
    // getDiscounts();
    getCartData();
  }, []);

  const getUserData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    await axios
      .get(REQUEST_URL + `/auth/users/me`, config)
      .then((res) => {
        setUserData(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(cart);
  if (cart !== null && cart !== undefined) {
    userCart = cart;
    console.log(userCart);
    isLoader = false;
  }

  const quantityIncrement = async (gift) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const is_ticket = false;
    console.log(gift, is_ticket);
    const body = JSON.stringify({ gift, is_ticket });
    try {
      const res = await axios.post(
        REQUEST_URL + `/api/carts/add/`,
        body,
        config
      );
      getCartData();
    } catch (error) {
      console.log("in catch block", error);
    }
  };
  const quantityDecrement = async (gift) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const is_ticket = false;
    const is_dec = true;
    console.log(gift, is_ticket);
    const body = JSON.stringify({ gift, is_ticket, is_dec });
    try {
      await axios.post(REQUEST_URL + `/api/carts/add/`, body, config);
      getCartData();
    } catch (error) {
      console.log("in catch block", error);
    }
  };

  const deleteGT = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    await axios
      .delete(REQUEST_URL + `/api/carts/delete/${id}`, config)
      .then((res) => {
        getCartData();
      })
      .catch(function (error) {});
  };

  // const Navbar = () => {
  //   return (
  //     <header className="shoopingnavbar navbar navbar-expand-lg navbar-light header">
  //       <NavLink to="/" className="m-0 p-0 d-flex ml-5 figure NavLink heading">
  //         {/* <img className="img-fluid mt-0" src={Logo} alt="logo" /> */}
  //         <h1 className="figcaption">Paradise Competitions</h1>
  //       </NavLink>
  //       <button
  //         className="navbar-toggler"
  //         type="button"
  //         data-toggle="collapse"
  //         data-target="#navbarSupportedContent"
  //         aria-controls="navbarSupportedContent"
  //         aria-expanded="false"
  //         aria-label="Toggle navigation"
  //       >
  //         <span className="navbar-toggler-icon"></span>
  //       </button>

  //       <nav className="collapse navbar-collapse" id="navbarSupportedContent">
  //         <ul className="navbar-nav pb-5 pb-lg-0 pt-1">
  //           <li className="nav-item">
  //             <h2>
  //               <b>Welcome</b>
  //             </h2>
  //             <h1>{userData.name}</h1>
  //           </li>
  //           <li className="nav-item">
  //             <h2>
  //               <b>Your</b>
  //             </h2>
  //             <Link to="/myaccount/acountdetail" style={{ color: "black" }}>
  //               <h1>Account</h1>
  //             </Link>
  //           </li>
  //           <li className="nav-item dustbinn">
  //             <span style={{ fontWeight: "400" }}>{userCart.length}</span>
  //             <i className="fas fa-shopping-cart"></i>
  //           </li>
  //           {/* <button className="england">
  //             <img className="img-fluid" src={England} alt="" /> EN
  //           </button> */}
  //         </ul>
  //       </nav>
  //     </header>
  //   );
  // };
  // console.log(userCart[1].ticket);
  let discount = discounts
    .reduce((acc, item) => acc + item.amount, 0)
    .toFixed(2);
  let subtotal = userCart
    .reduce((acc, item) => acc + Number(item.price), 0)
    .toFixed(2);
  let total = subtotal - subtotal * (discount / 100);
  if (isLoader === false) {
    const cartTicket = userCart.map((obj, i) => {
      // console.log(obj.competition.images[i].iamge);
      if (obj.is_ticket) {
        return (
          <div className="shopping-items" key={i}>
            <div>
              <div>
                <figure
                  className="shoping-items-img"
                  style={{ backgroundImage: `url(${obj.image})` }}
                ></figure>
              </div>
              <div>
                <h2>
                  {obj.title} Entrance Ticket:&nbsp;{" "}
                  <span>{obj.ticket.ticket}</span>
                </h2>
              </div>
            </div>
            <div>
              <h1>1</h1>
            </div>
            <div>
              <h1>{obj.price}</h1>
            </div>
            <div>
              <h1>{obj.price}</h1>
            </div>
            <div className="del-icon">
              <button
                onClick={() => {
                  deleteGT(obj.id);
                }}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        );
      } else {
        return (
          <div className="shopping-items" key={i}>
            <div>
              <div>
                <figure
                  className="shoping-items-img"
                  style={{ backgroundImage: `url(${obj.image})` }}
                ></figure>
              </div>
              <div>
                <h2>
                  {obj.title}:&nbsp; <span>{obj.ticket_name}</span>
                </h2>
              </div>
            </div>
            <div>
              <h1>
                <button
                  className="decBtn"
                  onClick={(e) => {
                    quantityDecrement(obj.gift);
                  }}
                >
                  <i className="fas fa-minus"></i>
                </button>
                {obj.quantity}
                <button
                  className="incBtn"
                  onClick={(e) => {
                    quantityIncrement(obj.gift);
                  }}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </h1>
            </div>
            <div>
              <h1>{obj.price}</h1>
            </div>
            <div>
              <h1>{Number(obj.price) * obj.quantity}</h1>
            </div>
            <div className="del-icon">
              <button
                onClick={() => {
                  deleteGT(obj.id);
                }}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        );
      }
    });
    return (
      <div className="shoopingcart-body">
        {/* <Navbar /> */}
        <section className="mainCart">
          <div className="first-div-cont">
            <div>
              <h1>Cart</h1>
              <Link to="/competitions">
                <button className="cont-shop-btn">
                  <i className="fas fa-chevron-left"></i>CONTINUE SHOPPING
                </button>
              </Link>
            </div>
          </div>

          <div className="second-div-cont">
            <div className="shopping-items-cont">
              <div className="items-head">
                <div>
                  <h1>ITEMS</h1>
                </div>
                <div>
                  <h1>QUANTITY</h1>
                </div>
                <div>
                  <h1>UNIT PRICE</h1>
                </div>
                <div>
                  <h1>SUBTOTAL</h1>
                </div>
              </div>

              {cartTicket}
            </div>
          </div>

          <div className="last-div-cont">
            <div>
              <button className="submit-co-code">Submit Coupon Code</button>
              <div>
                <h1>
                  Subtotal:&nbsp;
                  <span>${subtotal}</span>
                </h1>
                <h1>
                  Discount:&nbsp;
                  <span>{discount}%</span>
                </h1>
                <h1>
                  TOTAL:&nbsp;
                  <span>${total}</span>
                </h1>
                <NavLink
                  activeClassName="activeNavBtn"
                  className="NavLink"
                  to="/order"
                >
                  <button className="pro-checkout-btn" to="/order">
                    <i className="fas fa-chevron-right"></i>PROCEED TO CHECKOUT
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } else {
    return (
      <div className="shoopingcart-body">
        {/* <Navbar /> */}
        <section
          className="main-section"
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "30px",
          }}
        >
          <h2 style={{ color: "gray" }}>
            <b>No items in cart. Please add some.</b>
          </h2>
        </section>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.cartLoading,
  cart: state.auth.cart,
  // discounts: state.auth.discounts,
});

export default connect(mapStateToProps, { getCartData })(Cart);
