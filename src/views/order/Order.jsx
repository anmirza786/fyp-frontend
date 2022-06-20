import React, { useState, useEffect } from "react";
import { REQUEST_URL } from "../../actions/Constant";
import axios from "../axios";
import { NavLink } from "react-router-dom";
// import Logo from "../../assets/logo.png";
// import England from "../../assets/england.png";
import "./Order.css";
import { getCartData, load_user, getDiscounts } from "../../actions/auth";
import { connect, useDispatch } from "react-redux";
import PaymentScreen from "../business/payment";
// import Loader from "react-loader-spinner";
// import LoadingOverlay from "react-loading-overlay";

const Order = ({ cart, discounts = [], isLoading, user }) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(true);
  const [update, setUpdate] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    phone: "",
    address: "",
    town: "",
    postcode: "",
    country: "",
  });
  const [cartError, setCartError] = useState("");
  const dispatch = useDispatch();
  let discount = discounts
    .reduce((acc, item) => acc + item.amount, 0)
    .toFixed(2);
  let subtotal =
    cart && cart.reduce((acc, item) => acc + Number(item.price), 0).toFixed(2);
  let total = subtotal - subtotal * (discount / 100);
  useEffect(() => {
    dispatch(getCartData());
    dispatch(load_user());
    // dispatch(getDiscounts());
  }, []);

  const order = async () => {
    setShow(true);
    setShow2(false);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    await axios
      .put(REQUEST_URL + `/api/carts/reserve`, config)
      .then((res) => {
        if (res.data.error) {
          dispatch(getCartData());
          setShow(false);
          setShow2(true);
          setCartError(res.data.error);
          setTimeout(function () {
            alert(res.data.error);
          }, 70);
        }
      })
      .catch(function (error) {
        console.log(error, "hahahaha");
      });
  };
  const onChange = (e) => {
    setUpdate(false);
    setUserProfile({ ...user.profile, [e.target.name]: e.target.value });
    console.log(userProfile);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { phone, address, town, postcode } = userProfile;
    order();
  };

  if (isLoading === false && cart != null) {
    console.log(loading);
    const cartItem = cart.map((obj, i) => {
      if (obj.is_ticket) {
        return (
          <div className="order-items" key={i}>
            <div>
              <div>
                <figure
                  className="order-items-img"
                  style={{ backgroundImage: `url(${obj.image})` }}
                >
                  <span>{obj.quantity}</span>
                </figure>
              </div>
              <div>
                <h4>Digital surprise eCard with free</h4>
                <h2>
                  <span>{obj.title} Entrance Ticket:&nbsp;</span>{" "}
                  <span>{obj.ticket_name}</span>
                </h2>
              </div>
            </div>

            <div>
              <h1>{Number(obj.price)}</h1>
            </div>
          </div>
        );
      } else {
        return (
          <div className="order-items" key={i}>
            <div>
              <div>
                <figure
                  className="order-items-img"
                  style={{ backgroundImage: `url(${obj.image})` }}
                >
                  <span>{obj.quantity}</span>
                </figure>
              </div>
              <div>
                {/* <h4>Digital surprise eCard with free</h4> */}
                <h2>
                  <span>{obj.title}&nbsp;</span> <span>{obj.ticket_name}</span>
                </h2>
              </div>
            </div>

            <div>
              <h1>{Number(obj.price) * obj.quantity}</h1>
            </div>
          </div>
        );
      }
    });
    return (
      <>
        {/* {loading && (
          <LoadingOverlay
            className="overlay"
            active={true}
            spinner={
              <Loader
                style={{ display: "inline-block" }}
                type="TailSpin"
                color="white"
                height={50}
                width={50}
              />
            }
          >
            {" "}
            Uploading
          </LoadingOverlay>
        )} */}
        <div className="order-body">
          {/* <Navbar /> */}
          <form onSubmit={(e) => onSubmit(e)}>
            <section className="orderMainCart">
              <div className="first-div">
                <p>
                  {cartError != "" ? (
                    <ul style={{ paddingLeft: "10px" }}>
                      <li
                        style={{
                          color: "#E0115F",
                          fontSize: "25px",
                          listStyleType: "square",
                        }}
                      >
                        {/* <span>
												<strong>{key.toUpperCase()}</strong> :{' '}
											</span> */}
                        <span>
                          <strong>{cartError}</strong>
                        </span>
                      </li>
                    </ul>
                  ) : null}
                </p>

                <div>
                  <h1 style={{ fontWeight: "200" }}>Order & Payment Methods</h1>
                </div>
              </div>

              <div className="second-div">
                <div>
                  {/* <form onSubmit={(e) => onSubmit(e)}> */}
                  <div class="form-group">
                    <div class="form-group">
                      <label for="exampleFormControlTextarea1">
                        Street and Number
                      </label>
                      <input
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        style={{ color: "green" }}
                        defaultValue={user && user.name}
                        type="address"
                        placeholder="Your Adress here"
                        name="address"
                        onChange={(e) => onChange(e)}
                        rows="3"
                      />
                    </div>
                    <div class="form-group">
                      <label htmlFor="exampleInputEmail1">Phone</label>
                      <input
                        type="phone"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Phone"
                        style={{ color: "green" }}
                        defaultValue={user && user.name}
                        name="phone"
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <label for="exampleInputPassword1">Postal Code</label>
                    <input
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="postalCode"
                      style={{ color: "green" }}
                      defaultValue={user && user.name}
                      type="postcode"
                      name="postcode"
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">City</label>
                    <input
                      style={{ color: "green" }}
                      defaultValue={user && user.name}
                      type="town"
                      name="town"
                      onChange={(e) => onChange(e)}
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Town"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Country</label>
                    <input
                      style={{ color: "green" }}
                      defaultValue={user && user.name}
                      type="country"
                      name="country"
                      onChange={(e) => onChange(e)}
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Country"
                    />
                  </div>
                  {/* <button type="submit" class="btn btn-primary">
									Submit
							</button> */}
                  {/* </form > */}
                  {show && (
                    <>
                      <h1
                        className="m-0 py-3 text-center"
                        style={{
                          backgroundColor: "Black",
                          color: "white",
                          fontSize: "20px",
                          fontWeight: "200",
                        }}
                      >
                        Select Payment Method now{" "}
                      </h1>

                      <PaymentScreen
                        total={total}
                        update={update}
                        user={update ? user && user.profile : userProfile}
                        setShow={setShow}
                        setLoading={setLoading}
                      />
                    </>
                  )}
                </div>

                <div>
                  <div className="order-head">
                    <div>
                      <h1>ITEMS</h1>
                    </div>

                    <div>
                      <h1>SUBTOTAL</h1>
                    </div>
                  </div>

                  {/* TICKETS */}
                  {cartItem}
                </div>
              </div>

              <div className="last-div">
                <div>
                  <div>
                    {
                      <>
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
                        <button className="pro-checkout-btn" type="submit">
                          <i class="fas fa-chevron-right"></i>
                          PROCEED TO PAY
                        </button>
                      </>
                    }
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
      </>
    );
  } else {
    return (
      <div className="order-body">
        {/* <Navbar /> */}
        <section
          className="main-section"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <h1>No items to Order. Please add some in your cart.</h1>
        </section>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.cartLoading,
  cart: state.auth.cart,
  user: state.auth.user,
  discounts: state.auth.discounts,
});

export default connect(mapStateToProps)(Order);
