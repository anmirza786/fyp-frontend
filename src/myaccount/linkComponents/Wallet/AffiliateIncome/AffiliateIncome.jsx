import React from "react";
import ReactDOM from "react-dom";
// import Tree from "../../../../../assets/logo.png";
import axios from "axios";
import { REQUEST_URL } from "../../../../actions/Constant";
import "./AffiliateIncome.css";
import { connect } from "react-redux";
import moment from "moment";
const AACComponent = []
class AffiliateIncome extends React.Component {
  constructor(props) {
    super(props);
    let isPaypalConnected = false;
    // if (props.user && props.user.profile && props.user.profile.paypal_id ){
    //     isPaypalConnected=true
    // }
    let paypal_email = null;
    if (props.user && props.user.profile && props.user.profile.paypal_email) {
      paypal_email = props.user.profile.paypal_email;
    }
    console.log(props.user);
    this.state = {
      loading: false,
      isPaypalConnected: isPaypalConnected,
      clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
      balance: 0,
      affiliates: 0,
      email: "",
      paypal_email: paypal_email,
      widthDrawing: false,
      error: null,
      transactions: [],
    };
  }
  getTransactions = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    axios.get(REQUEST_URL + "/api/payouts", config).then((response) => {
      this.setState({ transactions: response.data });
    });
  };

  withDrawBalance = () => {
    console.log("dsfsdf");
    if (
      this.state.affiliates < 5 &&
      !this.state.paypal_email &&
      !this.state.widthDrawing
    ) {
      return;
    }
    this.setState({ widthDrawing: true });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    axios
      .post(REQUEST_URL + "/api/payouts/add", null, config)
      .then((response) => {})
      .catch((error) => {
        if (error.response.status == 400) {
          this.setState({ error: error.response.data.error });
        }
      })
      .finally((err) => {
        this.fetchBalance().finally((res) => {
          this.setState({ widthDrawing: false });
        });
      });
  };

  componentDidMount() {
    this.fetchBalance();
    this.getTransactions();
  }

  fetchBalance = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    return axios
      .get(REQUEST_URL + `/api/profile/affiliate/balance`, config)
      .then((response) => {
        this.setState({
          balance: response.data.balance,
          affiliates: response.data.affiliates,
          paypal_email: response.data.paypal_email,
          loading: false,
        });
      });
  };

  onConnect = (event) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    axios
      .post(REQUEST_URL + "/api/profile/paypal/connect", event.body, config)
      .then((response) => {
        this.setState({ paypal_email: response.data.email });
      });
  };

  render() {
    const clientId = {
      sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID,
    };
    const merchantId = process.env.REACT_APP_PAYPAL_MERCHANT_ID;
    return (
      <section className="wallet">
        <div>
          <h1>
            Total Leads: <span>{this.state.affiliates}</span>
          </h1>
          {/*<figure>
            <img className="img-fluid" src={Tree} alt="" />
          </figure>*/}
        </div>
        <div>
          <div className="balance-box">
            <h1>Available Balance</h1>
            <h1 className="total-price">&#163; {this.state.balance}</h1>
          </div>
          {/*<h1>Wallet Transactions</h1>*/}
          <h3 style={{ color: "rgb(210,210,210)", margin: "10px" }}>
            Earn 2% of your Leads transactions
          </h3>
          {this.state.affiliates < 1 ? (
            <span className="warning">
              You can withdraw when you have 5 Leads.
            </span>
          ) : (
            <></>
          )}
          {this.state.paypal_email ? (
            <div>
              <p className="paypal-connected">
                {" "}
                You are already connected with
              </p>
              <p className="paypal-connected-email">
                {this.state.paypal_email}
              </p>
              <p className="paypal-connected"> or Connect with an other one</p>
            </div>
          ) : (
            <p className="paypal-connected">
              {" "}
              For withdrawing, connect with PayPal.
            </p>
          )}

          <div className="widthdraw-btns">
            {!this.state.isPaypalConnected ? (
              <div style={{ width: "300px" }}>
                <AACComponent
                  clientId={clientId}
                  env="sandbox"
                  merchantId={merchantId}
                  pageType="signup"
                  onLogin={this.onConnect}
                />
              </div>
            ) : (
              <></>
            )}
            <span className="widthdraw-errors">{this.state.error}</span>
            <button
              onClick={this.withDrawBalance}
              className={
                !(
                  this.state.affiliates < 5 &&
                  !this.state.paypal_email &&
                  !this.state.widthDrawing
                )
                  ? "withdraw-btn"
                  : "withdraw-btn disabled"
              }
            >
              {this.state.widthDrawing ? "Withdrawing...." : "Withdraw Balance"}
            </button>
          </div>
        </div>
        <div>
          <section className="transection-section">
            {/* TRANSECTION-HEAD */}

            <div className="row transection-head m-0">
              <div className="col-2 col-lg-6">
                <h1>Date</h1>
              </div>
              <div className="col col-lg">
                <h1>Amount</h1>
              </div>
            </div>

            {/* TRANSECTION-DRETAIL-START */}
            {this.state.transactions.length == 0 ? (
              <div className="row transection-detail m-0">
                <div className="col-2 col-lg-6">
                  <h1>Oops</h1>
                </div>
                <div className="col col-lg">
                  <h1>No Transactions Found</h1>
                </div>
              </div>
            ) : (
              this.state.transactions.map((item, i) => (
                <div className="row transection-detail m-0">
                  <div className="col-2 col-lg-6">
                    <h1>{moment(item.created_at).format("llll")}</h1>
                  </div>
                  <div className="col col-lg">
                    <h1>{item.amount}</h1>
                  </div>
                </div>
              ))
            )}
          </section>
        </div>
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoading: state.auth.loading,
  error: state.auth.error,
  user: state.auth.user,
});
export default connect(mapStateToProps)(AffiliateIncome);
