import React, { useState } from "react";
import { useSelector } from 'react-redux';
import "./activetickets.css";
// import { Button } from '@material-ui/core';
// import Pic1 from "../../../../../assets/1660-gaming-1-4012-249095-290519041917.jpg";
// import Loader from "react-loader-spinner";
import { REQUEST_URL } from '../../../../actions/Constant';
import moment from "moment";

const ActiveTickets = () => {
  const state = useSelector((state) => state);
  const user = state.auth.user;
  
  if (user != null && user != undefined) {
    return (
      <section className="activetickets">
        { user && user.tickets_list.map((obj, i) => {
          if(moment().isBefore(moment(obj.closing_date).format("lll"))){
            return (
              <div className="row activeTickets-detail m-0">
            <div className="col-2 col-lg-1">
              <h1>{ obj.comp_id }</h1>
        </div>
        <div className="col-2 col-lg-2">
        <figure style={{backgroundImage:`url(${REQUEST_URL}/media/${obj.competition_image})`}}>
          </figure>
        </div>
        <div className="col col-lg-7">
              <h1>{ obj.competition_title }</h1>
        </div>
        <div className="col-2 col-lg-2">
              <button style={{
                backgroundColor: "var(--primary)",
                padding: "10px 10px",
                fontSize: "1.5rem"
              }}>
                { obj.ticket }
              </button>
        </div>
      </div>
            )
          }
        })
        }
    </section>
  );
  } else {
    return(
    <section className="activetickets">
      <div
					className='items-container'
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					{/* <Loader type='ThreeDots' color='#00FFEA' height={80} width={80} /> */}
				</div>
      </section>
    )
  }
};
export default ActiveTickets;