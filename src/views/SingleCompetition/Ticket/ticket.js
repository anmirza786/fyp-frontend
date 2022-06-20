import React from "react";
import { connect, useSelector } from "react-redux";
import "./tickets.css";
import Swiper from "swiper";
import "./section-2.css";
// import Ecard from "../ecard/section-2";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { getCartData } from "../../../actions/auth";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
// import Loader from "react-loader-spinner";
import Footer from "../../../components/Footers/Footer";
import { ProgressBar } from "react-bootstrap";

// REQUEST VARIABLE
import { REQUEST_URL } from "../../../actions/Constant";
// import EcardVideo from "../../../../../assets/eCardVideo.mp4";
import ReactHtmlParser from "react-html-parser";

class Ticket extends React.Component {
  state = {
    id: "",
    days: "",
    hours: "",
    minutes: "",
    seconds: "",

    isloader: true,

    competition: {},
    btnArray: [],
    allTicketsList: [],
    images: [],

    price: 0,

    defaultTickets: [],
    defaultStatuses: [],
    defaultTicketIds: [],

    cartTickets: [],

    luckDipticket: "",
    luckyDipCount: 0,
    luckyDipMsg: "",

    availableTickets: [],
    soldTickets: [],
    number: 1,
    endLimit: 5,
    key: "A",
    // btn index
    index: null,
    defaultIndex: 0,
  };
  // this function is returning tickets related to the alphbet it gets and A is default
  ticketNumbers = (alphabet = "A") => {
    const allTicketsArray = this.state.allTicketsList[0]; //this list has all the tickets of current competition
    const allStatusArray = this.state.allTicketsList[1]; //this list contain statuses of each ticket like 1 and 2 or 3
    const allTicketIds = this.state.allTicketsList[2]; //this list contain id of each ticket which is coming from backend
    const result = [];
    const status = [];
    const ids = [];

    const availableticket = [];
    const soldticket = [];

    const results = [result, status, ids];
    for (var i = 0; i < allTicketsArray.length; i++) {
      // this switch statement is getting all available tickets for lucky dip
      switch (allStatusArray[i]) {
        case 1:
        case 3:
          availableticket.push(allTicketsArray[i]);
          break;
        case 2:
          soldticket.push(allTicketsArray[i]);
          break;
      }
      // this if statement is seprating the tickets with matched alphabets
      if (allTicketsArray[i].includes(alphabet)) {
        results[0].push(allTicketsArray[i]);
        results[1].push(allStatusArray[i]);
        results[2].push(allTicketIds[i]);
      }
    }
    this.setState({
      availableTickets: availableticket,
      soldTickets: soldticket,
    });
    return results;
  };

  // This function is getting all-tickets, its statuses and ids of each ticket from current competition
  ticketsArray = () => {
    const tickets = this.state.competition.tickets;
    var allTickets = [];
    var allStatuses = [];
    var allIds = [];
    var mainList = [allTickets, allStatuses, allIds];
    for (let i = 0; i < tickets.length; i++) {
      mainList[0].push(tickets[i].ticket);
      mainList[1].push(tickets[i].status);
      mainList[2].push(tickets[i].id);
    }
    return mainList;
  };

  // this function is providing range of alphabets like ['A','B','C','D',] by getting "a-d"
  ticketsAlphabetRange = (range) => {
    const btnRange = range.toUpperCase(); // value coming as a-b this line making it like A-Z
    const alphabetList = btnRange.split("-"); //spliting A and Z in list on different indexes
    var startingAlphabet = alphabetList[0].charCodeAt(0); //taking "Ascii" of starting alphabet in variable:startingAlphabet
    var endingAlphabet = alphabetList[1].charCodeAt(0); //taking "Ascii" of ending alphabet named variable:endingAlphabet
    var allAlphabets = [];
    for (; startingAlphabet <= endingAlphabet; startingAlphabet++) {
      allAlphabets.push(String.fromCharCode(startingAlphabet));
    }
    return allAlphabets;
  };

  luckyDip = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const user_id = this.props.user_id;
    const comp_id = this.props.match.params.id;
    const price = this.state.competition.discount_active
      ? this.state.competition.discount_price
      : this.state.competition.price;
    const image = this.state.competition.images[0].image;
    const title = this.state.competition.title;
    const body = JSON.stringify({
      user_id,
      comp_id,
      price,
      image,
      title,
    });
    await axios
      .post(REQUEST_URL + `/api/competitions/lucky`, body, config)
      .then((res) => {
        if (res.data.success) {
          this.componentDidMount();
        } else if (res.data.notAvailable) {
          console.log(res.data.notAvailable);
          this.setState({ luckyDipMsg: res.data.notAvailable });
        } else if (res.data.timeout) {
          setTimeout(function () {
            alert(res.data.timeout);
          }, 500);
          this.setState({ luckyDipCount: 0 });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //   timeincrement = async () => {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `JWT${localStorage.getItem("access")}`,
  //         Accept: "application/json",
  //       },
  //     };
  //     const comp_id = this.props.match.params.id;
  //     const body = JSON.stringify({ comp_id });
  //     await axios
  //       .put(REQUEST_URL + `/api/competitions/time`, body, config)
  //       .then((res) => {
  //         console.log(res.data);
  //         if (res.data === "success") {
  //           this.componentDidMount();
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   };

  getCartData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    await axios
      .get(REQUEST_URL + `/api/carts/active`, config)
      .then((res) => {
        if (res.data.items.length >= 1) {
          const arr = [];
          for (let i = 0; i < res.data.items.length; i++) {
            if (
              res.data.items[i].is_ticket &&
              this.state.competition.title === res.data.items[i].title
            ) {
              arr.push(res.data.items[i].ticket_name);
            }
          }
          this.setState({ cartTickets: arr });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  addToCart = async (ticketId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    console.log(this.props);
    const user_id = this.props.user;
    const competition = this.props.match.params.id;
    const price = this.state.competition.discount_active
      ? this.state.competition.discount_price
      : this.state.competition.price;
    const ticket = ticketId;
    const image = this.state.competition.images[0].image;
    const title = this.state.competition.title;
    const is_ticket = true;
    const body = JSON.stringify({
      user_id,
      competition,
      // ticket_name,
      ticket,
      is_ticket,
      price,
      image,
      title,
    });
    console.log(body);
    try {
      const res = await axios.post(
        REQUEST_URL + `/api/carts/add/`,
        body,
        config
      );
      console.log(res, "hahahahaha");
      this.props.getCartData();
    } catch (error) {
      if (error.response.data.timeout) {
        setTimeout(function () {
          alert(error.response.data.timeout);
        }, 500);
        this.setState({ luckyDipCount: 0 });
      }
      console.log("in catch block", error.response);
    }
  };
  async componentDidMount() {
    // FETCHED DATA HERE
    await axios
      .get(REQUEST_URL + `/api/competitions/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({ competition: { ...res.data }, isloader: false });
        this.props.getCartData();
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({
      btnArray: this.ticketsAlphabetRange(
        this.state.competition.letter_choices
      ),
      allTicketsList: this.ticketsArray(),
      images: this.state.competition.images,
    });

    // EXTRA JAVASCRIT FOR OTHER FUNCTIONALITY
    var galleryThumbs = new Swiper(".gallery-thumbs", {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    var galleryTop = new Swiper(".gallery-top", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: galleryThumbs,
      },
    });
    // TIMER JAVASCRIPT
    const countdown = () => {
      var countDownDate = new Date(
        moment(this.state.competition.actual_closing_date).format("lll")
      ).getTime();
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var Days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var Hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var Minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var Seconds = Math.floor((distance % (1000 * 60)) / 1000);
      //   if (Seconds == "0" && this.state.competition.date_increment_counter < 4) {
      //     this.timeincrement();
      //   }
      if (distance < 0) {
        let diffInMilliSeconds = Math.abs(countDownDate - now) / 1000;
        const days = Math.floor(diffInMilliSeconds / 86400);
        const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
        const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
        setTimeout(() => {
          this.setState({
            days: -days,
            hours: -hours,
            minutes: -minutes,
            seconds: Seconds,
          });
        }, 1000);
      } else {
        this.setState({
          days: Days,
          hours: Hours,
          minutes: Minutes,
          seconds: Seconds,
        });
      }
    };
    setInterval(countdown, 1000);

    setInterval(() => {
      if (this.props.cart != null && this.props.cart != undefined) {
        let cart = this.props.cart;
        if (cart.length > 0) {
          const arr = [];
          for (let i = 0; i < cart.length; i++) {
            if (
              cart[i].is_ticket &&
              this.state.competition.title === cart[i].title
            ) {
              arr.push(cart[i].ticket_name);
            }
          }
          this.setState({ cartTickets: arr });
        }
      }
    }, 1);

    const array = this.ticketNumbers();
    this.setState({
      defaultTickets: array[0],
      defaultStatuses: array[1],
      defaultTicketIds: array[2],
    });
  }

  render() {
    if (this.state.isloader === false) {
      const imagetop = this.state.images.map((obj, i) => {
        return (
          <div
            key={i}
            className="swiper-slide"
            style={{
              backgroundImage: `url(${obj.image})`,
            }}
          ></div>
        );
      });
      return (
        <>
          {/* <Navbar /> */}

          <div className="main-section">
            {/* ECARD SECTION */}

            <section className="top-0 z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 section-2">
              <div className="eCard">
                <div style={{ position: "relative" }}>
                  {this.state.competition.discount_active ? (
                    <h1>
                      {/* this.state.competition.discount_price &&  */}
                      <span
                        className={"discount-bar"}
                        style={{ fontWeight: "600" }}
                      >
                        &#8364; {this.state.competition.price}
                      </span>
                      <span style={{ fontWeight: "600" }}>
                        {" "}
                        &#8364;
                        {this.state.competition.discount_price}
                      </span>
                    </h1>
                  ) : (
                    <h1>
                      <span style={{ fontWeight: "600" }}>
                        {" "}
                        &#8364;
                        {this.state.competition.price}
                      </span>
                    </h1>
                  )}
                </div>
                {/* <div style={{ color: "black" }}>
                  <p style={{ color: "black" }}>
                    Surprize digital Fortune Cookie
                  </p>
                  <p style={{ color: "black" }}>
                    Discounted compared to Gift Shop
                  </p>
                  <p style={{ color: "black" }}>
                    Buy one here, recieve one entry
                    <br />
                    to the competition for free
                    <br />
                    See below for free entry method
                  </p>
                </div> */}
              </div>
            </section>

            {/* Slider Section */}
            <section className="com-section-3" id="com-section-3 ">
              <h1 style={{ fontWeight: "200" }}>Prize</h1>
              <div className="portfolio-item-container">
                <div className="portfolio-item" id="timer">
                  <div className="swiper gallery-top">
                    <div className="swiper-wrapper">{imagetop}</div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                  </div>
                  <h1>{this.state.competition.title}</h1>
                </div>
                <div className="portfolio-item">
                  <div className="swiper gallery-thumbs">
                    <div className="swiper-wrapper">{imagetop}</div>
                  </div>
                  <div className="slider-counter">
                    <p>See Live Draw in</p>

                    <div className="inner-counter">
                      <div>
                        <h1>{this.state.days}</h1>
                        <h3>Days</h3>
                      </div>
                      <div>
                        <h1>{this.state.hours}</h1>
                        <h3>Hours</h3>
                      </div>
                      <div>
                        <h1>{this.state.minutes}</h1>
                        <h3>Minutes</h3>
                      </div>
                      <div>
                        <h1>{this.state.seconds}</h1>
                        <h3>Seconds</h3>
                      </div>
                    </div>
                    {/* <button className="comunity">
                      <a
                        href="https://www.facebook.com/paradisecompetitions.be"
                        style={{ color: "black" }}
                      >
                        <i className="fas fa-gift"></i>Join community
                      </a>
                    </button> */}
                    <h4>
                      on{" "}
                      {moment(
                        this.state.competition.actual_closing_date
                      ).format("llll")}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="valueConparent">
                <div className="valueCont">
                  <div className="w-full flex justify-between m-0 p-0">
                    <div className="col">{this.state.soldTickets.length}</div>
                    <div className="col">
                      {this.state.availableTickets.length} Left
                    </div>
                    <div className="col">
                      {this.state.competition.total_tickets}
                    </div>
                  </div>
                  {/* <ProgressBar
                    now={
                      (this.state.soldTickets.length /
                        this.state.competition.total_tickets) *
                      100
                    }
                  /> */}

                  <div className="row value-inner  m-0 p-0">
                    <div
                      style={{
                        width: `${
                          (this.state.soldTickets.length /
                            this.state.competition.total_tickets) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Ticket section */}

            <div className="tickets">
              <h1 style={{ fontWeight: "200" }}>Select your tickets</h1>
              <p>
                First click a letter, then choose a number. Repeate this in case
                You want more tickets.
              </p>
              {/* <button
                className="luckydrip"
                onClick={() => {
                  if (this.props.isAuthenticated) {
                    const a = 1;
                    const b = a + this.state.luckyDipCount;
                    this.luckyDip();
                    this.setState({ luckyDipCount: b });
                  } else {
                    return this.props.history.replace("/signin");
                  }
                }}
              >
                Lucky Dip <span>{this.state.luckyDipCount}</span>{" "}
              </button> */}

              {/* here our ticket genrator alphbaet buttons are gettting print */}
              <Tabs
                id="controlled-tab-example"
                className="alphabets"
                defaultActiveKey={this.state.key}
                activeKey={this.state.key}
                onSelect={(k) => {
                  const clickedTicket = this.ticketNumbers(k);
                  this.setState({
                    defaultTickets: clickedTicket[0],
                    defaultStatuses: clickedTicket[1],
                    defaultTicketIds: clickedTicket[2],
                    key: k,
                  });
                }}
              >
                {/* here ticket buttons are getting print */}
                {this.state.btnArray.map((object, i) => (
                  <Tab eventKey={object} title={object}></Tab>
                ))}
                <div className="ticketsNo">
                  {this.state.defaultTickets.map((obj, i) => {
                    // console.log(this.state.btnArray);
                    switch (this.state.defaultStatuses[i]) {
                      case 1:
                        return (
                          <button
                            className="ticket"
                            key={i}
                            value={obj}
                            onClick={(e) => {
                              if (this.props.isAuthenticated) {
                                const ticketId = this.state.defaultTicketIds[i];
                                const ticket_name = obj;
                                this.addToCart(ticketId);
                                e.target.classList.add("activeTicket");
                              } else {
                                return this.props.history.replace(
                                  "/auth/login/"
                                );
                              }
                            }}
                          >
                            {obj}
                          </button>
                        );
                        break;
                      case 2:
                        return (
                          <button disabled key={i}>
                            {obj}
                          </button>
                        );
                        break;
                      case 3:
                        return (
                          <button
                            style={{
                              backgroundColor: this.state.cartTickets.includes(
                                obj
                              )
                                ? "gold"
                                : "#E0115F",
                            }}
                            key={i}
                          >
                            {obj}
                          </button>
                        );
                        break;
                    }
                  })}
                </div>
              </Tabs>
              <NavLink className="tickets-add" to="/cart">
                <button className="tickets-addtocart">Go to Cart</button>
              </NavLink>
              <div className="discription">
                <h1 style={{ fontWeight: "200" }}>Description</h1>
                <div>
                  <p
                    style={{
                      // wordSpacing: "2px",
                      // fontSize: "25px",
                      color: "black",
                    }}
                  >
                    {/* <br /> */}
                    {this.state.competition.title}
                    <br />
                    {this.state.competition.total_winners} winner
                    <br />
                    Maximum {this.state.competition.total_tickets} Entries
                    <br />
                    {this.state.competition.letter_choices} letters{" "}
                    {this.state.competition.numbers_from} entries per letter
                    <br />
                    {ReactHtmlParser(this.state.competition.description)}
                  </p>

                  {/* <h4 className="comp-description" dangerouslySetInnerHTML={{
                        __html: this.state.competition.description,
                  }} /> */}
                  {/* <h4 className="comp-description">
                    
                  </h4> */}

                  <h5 style={{ fontSize: "20px", color: "black" }}>
                    GOOD LUCK !
                  </h5>
                  <hr />
                  <div>
                    <p style={{ color: "black" }}>
                      The Live Streaming of the draw start 10 minutes before the
                      counter reaches 00 00 00 here:
                    </p>

                    {/* <button className="comunity">
                      <a
                        href={this.state.competition.live_draw_link}
                        style={{ color: "black" }}
                      >
                        <i className="fas fa-gift"></i>Join our community
                      </a>
                    </button> */}
                  </div>
                  {/* <p style={{ color: "black" }}>
                    For free entry method see TnC. Buy one digital Fortune
                    Cookie here, receive one competition entry ticket for free.{" "}
                    <br />
                    If all of the tickets of the competition are not selected by
                    the time the countdown timer reaches zero, an additional 7
                    days will be added to the countdown timer. <br />
                    If all of the tickets have not been selected after the first
                    extended time period, a 7 day extension will be added up to
                    a maximum of 4 times. <br />
                    If all of the tickets have not been selected after 4
                    extensions of 7 days, a cash alternative prize of 70% of the
                    money taken in this competition will be awarded to the
                    winner(s) instead of the prize. <br />
                    Our competitions are totally transparent. Our Winners Podium
                    page with winners names and winners photographs shows proof
                    of it. Our competitions are totally ligit. Check our
                    Trustpilot reviews.
                  </p> */}
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </>
      );
    } else {
      return (
        <>
          {/* <Navbar /> */}
          <section
            className="main-section"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {/* <Loader type="ThreeDots" color="#00FFEA" height={80} width={80} />
             */}
          </section>
          <Footer />
        </>
      );
    }
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  cart: state.auth.cart,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getCartData })(Ticket);
