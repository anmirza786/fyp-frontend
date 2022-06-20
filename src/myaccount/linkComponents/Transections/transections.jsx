import React from "react";
import { useSelector } from "react-redux";
// import { REQUEST_URL } from "../../../../constant/Constant";
// import axios from "axios";
import "./transections.css";
import moment from "moment";

// import Pic1 from "../../../../assets/77217552.webp";

const Transections = () => {
  const state = useSelector((state) => state);
  const user = state.auth.user;
  return (
    <section className="transection-section">
      {/* TRANSECTION-HEAD */}

      <div className="row transection-head m-0">
        <div className="col-2 col-lg-2">
          <h2>Date</h2>
        </div>
        <div className="col-3 col-lg-2">
          <h2>Transaction ID</h2>
        </div>
        <div className="col-3 col-lg-2">
          <h2>Order ID</h2>
        </div>
        <div className="col-2 col-lg-2">
          <h2>&#8364;</h2>
        </div>
        <div className="col-2 col-lg-2">
          <h2>Brand </h2>
        </div>
      </div>

      {/* TRANSECTION-DRETAIL-START */}

      {user &&
        user.transactions.map((obj, i) => {
          return (
            <div className="row transection-detail m-0">
              <div className="col-2 col-lg-2">
                <p>{moment(obj.date_time).format("llll")}</p>
              </div>
              <div className="col-3 col-lg-2">
                <h1>{obj.transaction_id}</h1>
              </div>
              <div className="col-3 col-lg-2">
                <h1>{obj.payment_order_id}</h1>
              </div>
              <div className="col-2 col-lg-2">
                <p> {obj.amount_paid}</p>
              </div>
              <div className="col-2 col-lg-2">
                <p>
                  {obj.payment_type}
                </p>
              </div>
            </div>
          );
        })}

      {/* TRANSECTION-DRETAIL-END */}
    </section>
  );
};
export default Transections;
