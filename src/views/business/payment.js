import React, { useEffect, useState } from "react";
import { REQUEST_URL } from "../../actions/Constant.js";
import ReactDOM from "react-dom";
import axios from "../axios";
import { getCartData } from "../../actions/auth";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
const PayPalButton = "Y"
function PaymentScreen({ total, user, setShow, update, setLoading }) {
  // const { phone, address, town, postcode, country } = user;
  // console.log(phone, address, town, postcode, country, "in payment page");

  const dispatch = useDispatch();
  const history = useHistory();
  //   const state = useSelector((state) => state);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: 'total',
          },
        },
      ],
    });
  };

  const order = async (details) => {
    setLoading(true);
    setShow(false);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    const exact_details = details.purchase_units[0].payments.captures[0];

    const payment_order_id = details.id;
    const amount_paid = exact_details.amount.value;
    const date_time = exact_details.create_time;
    const transaction_id = exact_details.id;

    const body = JSON.stringify({
      // phone,
      // address,
      // town,
      // postcode,
      // country,
      // payment_order_id,
      // amount_paid,
      // date_time,
      // transaction_id,
    });
    console.log(body, "body while ordering");
    // await axios
    //   .post(REQUEST_URL + `/api/carts/order`, body, config)
    //   .then((res) => {
    //     dispatch(getCartData());
    //     if (res.data.error) {
    //       setLoading(false);
    //       dispatch(getCartData());
    //       setTimeout(function () {
    //         alert(res.data.error);
    //       }, 70);
    //     } else if (res.data.success) {
    //       setLoading(false);
    //       history.push("/");
    //       console.log(res.data.success);
    //       setTimeout(function () {
    //         alert(
    //           "Dear customer,\n" +
    //             "Your Payment was successfull." +
    //             "\nThankYou for your purchase. we wish you good luck in competitions!"
    //         );
    //       }, 500);
      //   }
      // })
      // .catch(function (error) {
      //   console.log(error, "hahahaha");
      // });
  };

  const onApprove = (data, actions) => {
    actions.order.capture().then(function (details) {
      console.log(details, "details in paradise order page");
      if (details.status === "COMPLETED") {
        console.log(details);
        order(details);
      }
    });
    return actions.order.capture();
  };

  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <p className="m-0 py-1"></p>
        <PayPalButton
          style={{
            size: "responsive",
            color: "gold",
            layout: "vertical",
            shape: "pill",
            label: "pay",
            branding: true,
            fundingicons: true,
          }}
          funding={{
            allowed: [window.paypal.FUNDING.CARD],
          }}
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      </div>
    </>
  );
}

export default PaymentScreen;
// &disable-funding=credit
// &enable-funding=bancontact,card
