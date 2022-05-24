import React from "react";
import "./section-1.css";
import axios from "axios";
// import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import { REQUEST_URL } from "../../actions/Constant";
import { ProgressBar } from "react-bootstrap";

class Section1 extends React.Component {
  state = {
    competitions: [],
    isLoader: true,
    satsession: [],
    satTitle: 0,
    activeCompetitions: [],
    activeTitle: 0,
    fit4Competitions: [],
    fitTitle: 0,
    xMasCompetitions: [],
    xMasTitle: 0,
  };

  async componentDidMount() {
    await axios
      .get(REQUEST_URL + `/api/competitions/`)
      .then((res) => {
        // filter_competitions_start
        const satsession = res.data.filter((obj) => {
          this.setState({ satTitle: 1 });
          return obj.group_title === 1;
        });
        const activeCompetitions = res.data.filter((obj) => {
          this.setState({ activeTitle: 2 });
          return obj.group_title === 2;
        });
        const fit4Competitions = res.data.filter((obj) => {
          this.setState({ fitTitle: 3 });
          return obj.group_title === 3;
        });
        const xMasCompetitions = res.data.filter((obj) => {
          this.setState({ xMasTitle: 4 });
          return obj.group_title === 4;
        });
        // filter_competitions_end

        this.setState({
          competitions: res.data,
          isLoader: false,
          satsession,
          activeCompetitions,
          fit4Competitions,
          xMasCompetitions,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    // mapping_filtered_competitions_start
    const satsession = this.state.satsession.map((obj, index) => {
      var soldTickets = 0;
      for (var i = 0; i < obj.tickets.length; i++) {
        switch (obj.tickets[i].status) {
          case 2:
            // case 3:
            soldTickets++;
            break;
        }
      }
      console.log("soldtickets:", soldTickets);
      if (index < 12) {
        return (
          <div className="items" key={index}>
            <Link
              smooth
              className="items-link"
              to={`/competitions/${obj.id}#timer`}
            >
              <div>
                <div
                  style={{
                    backgroundImage: `url(${this.state.satsession[index].images[0].image})`,
                  }}
                >
                  <div
                    style={{ fontWeight: "600" }}
                    className={
                      soldTickets ===
                      this.state.satsession[index].tickets.length
                        ? "sold-out"
                        : ""
                    }
                  >
                    {soldTickets === this.state.satsession[index].tickets.length
                      ? "Sold Out !"
                      : ""}
                  </div>
                  <ProgressBar
                    now={
                      (soldTickets /
                        this.state.satsession[index].tickets.length) *
                      100
                    }
                  />
                </div>
              </div>
            </Link>
            <h3 style={{ fontWeight: "700", fontSize: "2.0rem" }}>
              {obj.title}
            </h3>
            {soldTickets === this.state.satsession[index].tickets.length ? (
              <></>
            ) : obj.discount_active ? (
              <h1>
                {/* obj.discount_price &&  */}
                <span
                  className={"discount-bar"}
                  style={{ fontWeight: "600", fontSize: "2.0rem" }}
                >
                  $ {obj.price}{" "}
                </span>
                <span style={{ fontWeight: "600", fontSize: "2.0rem" }}>
                  {" "}
                  $ {obj.discount_price}
                </span>
              </h1>
            ) : (
              <h1>
                <span style={{ fontWeight: "600", fontSize: "2.0rem" }}>
                  {" "}
                  $ {obj.price}{" "}
                </span>
              </h1>
            )}
          </div>
        );
      }
    });
    const activeCompetitions = this.state.activeCompetitions.map(
      (obj, index) => {
        var soldTickets = 0;
        for (var i = 0; i < obj.tickets.length; i++) {
          switch (obj.tickets[i].status) {
            case 2:
              // case 3:
              soldTickets++;
              break;
          }
        }
        if (index < 12) {
          return (
            <div className="items" key={index}>
              <Link
                smooth
                className="items-link"
                to={`/competitions/${obj.id}#timer`}
              >
                <div>
                  <div
                    style={{
                      backgroundImage: `url(${this.state.activeCompetitions[index].images[0].image})`,
                    }}
                  >
                    <div
                      style={{ fontWeight: "600" }}
                      className={
                        soldTickets ===
                        this.state.activeCompetitions[index].tickets.length
                          ? "sold-out"
                          : ""
                      }
                    >
                      {soldTickets ===
                      this.state.activeCompetitions[index].tickets.length
                        ? "Sold Out !"
                        : ""}
                    </div>
                    <ProgressBar
                      now={
                        (soldTickets /
                          this.state.activeCompetitions[index].tickets.length) *
                        100
                      }
                    />
                  </div>
                </div>
              </Link>
              <h3 style={{ fontWeight: "700", fontSize: "2.0rem" }}>
                {obj.title}
              </h3>
              {soldTickets ===
              this.state.activeCompetitions[index].tickets.length ? (
                <></>
              ) : obj.discount_active ? (
                <h1>
                  {/* obj.discount_price &&  */}
                  <span
                    className={"discount-bar"}
                    style={{ fontWeight: "600", fontSize: "2.0rem" }}
                  >
                    $ {obj.price}{" "}
                  </span>
                  <span style={{ fontWeight: "600", fontSize: "2.0rem" }}>
                    {" "}
                    $ {obj.discount_price}
                  </span>
                </h1>
              ) : (
                <h1>
                  <span style={{ fontWeight: "600", fontSize: "2.0rem" }}>
                    {" "}
                    $ {obj.price}{" "}
                  </span>
                </h1>
              )}
            </div>
          );
        }
      }
    );
    const fit4Competitions = this.state.fit4Competitions.map((obj, index) => {
      var soldTickets = 0;
      for (
        var i = 0;
        i < this.state.fit4Competitions[index].tickets.length;
        i++
      ) {
        switch (this.state.fit4Competitions[index].tickets[i].status) {
          case 2:
            // case 3:
            soldTickets++;
            break;
        }
      }
      if (index < 12) {
        return (
          <div className="items" key={index}>
            <Link
              smooth
              className="items-link"
              to={`/competitions/${obj.id}#timer`}
            >
              <div>
                <div
                  style={{
                    backgroundImage: `url(${this.state.fit4Competitions[index].images[0].image})`,
                  }}
                >
                  <div
                    style={{ fontWeight: "600" }}
                    className={
                      soldTickets ===
                      this.state.fit4Competitions[index].tickets.length
                        ? "sold-out"
                        : ""
                    }
                  >
                    {soldTickets ===
                    this.state.fit4Competitions[index].tickets.length
                      ? "Sold Out !"
                      : ""}
                  </div>
                  <ProgressBar
                    now={
                      (soldTickets /
                        this.state.fit4Competitions[index].tickets.length) *
                      100
                    }
                  />
                </div>
              </div>
            </Link>
            <h3 style={{ fontWeight: "700", fontSize: "2.0rem" }}>
              {obj.title}
            </h3>
            {soldTickets ===
            this.state.fit4Competitions[index].tickets.length ? (
              <></>
            ) : obj.discount_active ? (
              <h1>
                {/* obj.discount_price &&  */}
                <span
                  className={"discount-bar"}
                  style={{ fontWeight: "600", fontSize: "2.0rem" }}
                >
                  $ {obj.price}{" "}
                </span>
                <span style={{ fontWeight: "600", fontSize: "2.0rem" }}>
                  {" "}
                  $ {obj.discount_price}
                </span>
              </h1>
            ) : (
              <h1>
                <span style={{ fontWeight: "600", fontSize: "2.0rem" }}>
                  {" "}
                  $ {obj.price}{" "}
                </span>
              </h1>
            )}
          </div>
        );
      }
    });
    const xMasCompetitions = this.state.xMasCompetitions.map((obj, index) => {
      var soldTickets = 0;
      for (var i = 0; i < obj.tickets.length; i++) {
        switch (obj.tickets[i].status) {
          case 2:
            // case 3:
            soldTickets++;
            break;
        }
      }
      if (index < 12) {
        return (
          <div className="items" key={index}>
            <Link
              smooth
              className="items-link"
              to={`/competitions/${obj.id}#timer`}
            >
              <div>
                <div
                  style={{
                    backgroundImage: `url(${this.state.xMasCompetitions[index].images[0].image})`,
                  }}
                >
                  <div
                    style={{ fontWeight: "600" }}
                    className={
                      soldTickets ===
                      this.state.xMasCompetitions[index].tickets.length
                        ? "sold-out"
                        : ""
                    }
                  >
                    {soldTickets ===
                    this.state.xMasCompetitions[index].tickets.length
                      ? "Sold Out !"
                      : ""}
                  </div>
                  <ProgressBar
                    now={
                      (soldTickets /
                        this.state.xMasCompetitions[index].tickets.length) *
                      100
                    }
                  />
                  {/* <div class='items-colorfull'>
											<div
												style={{
													width: `${(soldTickets /
														this.state.xMasCompetitions[index].tickets
															.length) *
														100
														}%`,
												}}
												className='progress-bar'
											></div>
										</div> */}
                </div>
              </div>
            </Link>
            <h3
              style={{
                fontWeight: "700",
                fontSize: "2.0rem",
                marginBottom: "0",
              }}
            >
              {obj.title}
            </h3>
            {soldTickets ===
            this.state.xMasCompetitions[index].tickets.length ? (
              <></>
            ) : obj.discount_active ? (
              <h1>
                {/* obj.discount_price &&  */}
                <span
                  className={"discount-bar"}
                  style={{
                    fontWeight: "600",
                    fontSize: "2.0rem",
                  }}
                >
                  $ {obj.price}{" "}
                </span>
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "2.0rem",
                  }}
                >
                  {" "}
                  $ {obj.discount_price}
                </span>
              </h1>
            ) : (
              <h1>
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "2.0rem",
                  }}
                >
                  {" "}
                  $ {obj.price}{" "}
                </span>
              </h1>
            )}
          </div>
        );
      }
    });
    // mapping_filtered_competitions_end

    return (
      <>
        {/* conditional_rendering */}
        {this.state.satTitle === 1 && satsession != 0 ? (
          <section className="c-section-1">
            <h1 style={{ fontWeight: 200 }}>Sat Session</h1>
            <div className="items-container">{satsession}</div>
          </section>
        ) : null}

        {this.state.activeTitle === 2 && activeCompetitions != 0 ? (
          <section className="c-section-1">
            <h1 style={{ fontWeight: 200 }}>Active Competitions</h1>
            <div className="items-container">{activeCompetitions}</div>
          </section>
        ) : null}
        {this.state.fitTitle === 3 && fit4Competitions != 0 ? (
          <section className="c-section-1">
            <h1 style={{ fontWeight: 200 }}>Fit 4 Summer Competitions</h1>
            <div className="items-container">{fit4Competitions}</div>
          </section>
        ) : null}

        {this.state.xMasTitle === 4 && xMasCompetitions != 0 ? (
          <section className="c-section-1">
            <h1 style={{ fontWeight: 200 }}>X-mas Competitions</h1>
            <div className="items-container">{xMasCompetitions}</div>
          </section>
        ) : null}
        {/* conditional_rendering */}
      </>
    );
  }
}

export default Section1;
