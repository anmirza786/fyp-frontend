import React, { useState, useEffect } from "react";
// import axios from "../../../axios";
import "./AccountDetail.css";
// import store from "../../../../store";

// import { REQUEST_URL } from "../../../../constant/Constant";
import { update_profile, load_user } from "../../../actions/auth";
import { connect, useDispatch } from "react-redux";
// import Loader from "react-loader-spinner";

const AccountDetail = ({ user, isLoading }) => {
  const [userProfile, setUserProfile] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(load_user());
  }, [dispatch]);

  const onChange = (e) => {
    setUserProfile({ ...user.profile, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { phone, address, town, postcode, country } = userProfile;
    console.log(phone, address, town, postcode, country);
    dispatch(update_profile(phone, address, town, postcode, country));
  };
  const url = window.location.origin;
  return (
    
    <section className="account-detail">
      <h1>
        <i className="fas fa-envelope"></i>
        <input
          style={{ color: "tan", width: "600px" }}
          type="text"
          placeholder="Email"
          defaultValue={user && user.useremail}
          disabled
        />
      </h1>
      <h1>
        <i className="fas fa-user"></i>
        <input
          style={{ color: "tan", width: "600px" }}
          type="text"
          placeholder="Name"
          defaultValue={user && user.name}
          disabled
        />
      </h1>

      <form onSubmit={(e) => onSubmit(e)}>
        <h1>
          <i className="fas fa-phone"></i>
          <input
            style={{ color: "tan" }}
            defaultValue={user && user.profile.phone}
            type="phone"
            placeholder="phone number"
            name="phone"
            onChange={(e) => onChange(e)}
          />
        </h1>

        <h1>
          <i className="fas fa-home"></i>
          <input
            style={{ color: "tan", width: "600px" }}
            defaultValue={user && user.profile.address}
            type="address"
            placeholder="Street and Number"
            name="address"
            onChange={(e) => onChange(e)}
          />
        </h1>
        <h1>
          <i className="fas fa-code"></i>
          <input
            style={{ color: "tan" }}
            defaultValue={user && user.profile.postcode}
            type="number"
            placeholder="Postal Code"
            name="postcode"
            onChange={(e) => onChange(e)}
          />
        </h1>
        <h1>
          <i className="fas fa-street-view"></i>
          <input
            style={{ color: "tan", width: "400px" }}
            defaultValue={user && user.profile.town}
            type="text"
            placeholder="Your City here"
            name="town"
            onChange={(e) => onChange(e)}
          />
        </h1>
        <h1>
          <i className="fas fa-flag "></i>
          <input
            style={{ color: "tan", width: "400px" }}
            defaultValue={user && user.profile.country}
            type="text"
            placeholder="Your Country here"
            name="country"
            onChange={(e) => onChange(e)}
          />
        </h1>
        <button
          type="submit"
          className="btn login"
          style={{ borderRadius: "1px" }}
        >
          {isLoading ? (
            <p>loading...</p>
          ) : (
            ""
          )}
          Save Changes
        </button>
      </form>
      {user && user.profile.allow_affiliate ? (
        <>
          <h1>
            <span className="pr-2">Affiliate Token</span>
            <i className="fas fa-share-alt"></i>
            <span>{user && user.affiliate_token}</span>
          </h1>
          <h1>
            <span className="pr-2">Affiliate Link</span>
            <i className="fas fa-link"></i>
            <div>
              <h1>
                {url}/signup?token={user && user.affiliate_token}
              </h1>
            </div>
          </h1>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.loading,
  error: state.auth.error,
  user: state.auth.user,
});

export default connect(mapStateToProps)(AccountDetail);
