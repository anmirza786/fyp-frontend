/*eslint-disable*/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
// import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import { auto } from "@popperjs/core";
import Competition from "./SingleCompetition/Competition";
import {
  ViewCompetitions,
  ViewInPreparedCompetitions,
} from "./apis/competitions";
import Competitions from "./Competitions";
import Section1 from "./Section-1/section-1";

class Index extends Component {
  state = {
    competitions: [],
    // done: "",
  };
  async componentDidMount() {
    try {
      const { data: competitions } = await ViewInPreparedCompetitions();
      this.setState({ competitions });
      this.state.competitions.map((comp) => console.log(comp.images[0]));
    } catch (ex) {
      // if (ex.response && ex.response.status === 404)
    }
  }
  render() {
    const { competitions } = this.state;
    return (
      <div>
        <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
          <div className="container mx-auto items-center flex flex-wrap">
            <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
              <div className="pt-32 sm:pt-0">
                <h2 className="font-semibold text-4xl text-blueGray-600">
                  Gift Redeemer and Store
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  Our Gift Competitions are a great way for you to win dream
                  prizes. We award cars, bikes, jewels, tech and more, for the
                  price of a coffee.
                </p>
                <div className="mt-12">
                  <a
                    href="#how-to-play"
                    className="how-to-play ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  >
                    How to play
                  </a>
                </div>
              </div>
            </div>
          </div>

          <img
            className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
            src={require("assets/img/pattern_react.png").default}
            alt="..."
          />
        </section>

        <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
          <div
            className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-100 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
          


          <div className="w-full px-4 mr-auto ml-auto">
            <div className="justify-evenly flex flex-wrap relative">
            <Section1 />
            </div>
          </div>

          
          <div className="justify-center text-center flex flex-wrap mt-24">
            <div className="w-full md:w-6/12 px-12 md:px-4">
              <h2 className="font-semibold text-4xl" id="how-to-play">
                How it Works
              </h2>
            </div>
          </div>
        </section>

        <section className="block relative z-1 bg-blueGray-600">
          <div className="container mx-auto">
            <div className="justify-center flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4  -mt-24">
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-4/12 px-4">
                    <h5 className="text-xl font-semibold pb-4 text-center">
                      Step 01
                    </h5>
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 bg-blueGray-700 shadow-lg rounded-lg text-center p-8 mt-8 w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      {/* <img
                      alt="..."
                      className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                      src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/nextjs.jpg"
                    /> */}
                      <p className="text-lg text-white mt-4 font-semibold">
                        Pick an amazing prize and enter the competition.
                      </p>
                    </div>
                  </div>

                  <div className="w-full lg:w-4/12 px-4">
                    <h5 className="text-xl font-semibold pb-4 text-center">
                      Step 02
                    </h5>
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 bg-blueGray-700 shadow-lg rounded-lg text-center p-8 mt-8 w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      {/* <img
                      alt="..."
                      className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                      src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/nextjs.jpg"
                    /> */}
                      <p className="text-lg text-white mt-4 font-semibold">
                        Select your tickets, or let the Lucky Dip selector
                        choose a letter and number for you.
                      </p>
                    </div>
                  </div>

                  <div className="w-full lg:w-4/12 px-4">
                    <h5 className="text-xl font-semibold pb-4 text-center">
                      Step 03
                    </h5>
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 bg-blueGray-700 shadow-lg rounded-lg text-center p-8 mt-8 w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      {/* <img
                      alt="..."
                      className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                      src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/nextjs.jpg"
                    /> */}
                      <p className="text-lg text-white mt-4 font-semibold">
                        Finalize payment. Wait for the Live Draw and be lucky...
                        Join our winners podium ! Daily winners !
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-blueGray-600 overflow-hidden">
          {/* <div className="container mx-auto pb-64">
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-5/12 px-12 md:px-4 ml-auto mr-auto md:mt-64">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-code-branch text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal text-white">
                Open Source
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-400">
                Since{" "}
                <a
                  href="https://tailwindcss.com/?ref=creativetim"
                  className="text-blueGray-300"
                  target="_blank"
                >
                  Tailwind CSS
                </a>{" "}
                is an open source project we wanted to continue this movement
                too. You can give this version a try to feel the design and also
                test the quality of the code!
              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-400">
                Get it free on Github and please help us spread the news with a
                Star!
              </p>
              <a
                href="https://github.com/creativetimofficial/notus-react?ref=nr-index"
                target="_blank"
                className="github-star mt-4 inline-block text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
              >
                Github Star
              </a>
            </div> */}

          {/* <div className="w-full md:w-4/12 px-4 mr-auto ml-auto mt-32 relative">
              <i className="fab fa-github text-blueGray-700 absolute -top-150-px -right-100 left-auto opacity-80 text-55"></i>
            </div>
          </div> */}
          {/* </div> */}
        </section>

        <section className="pb-16 bg-blueGray-200 relative pt-32">
          <div
            className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          {/* <div className="container mx-auto">
          <div className="flex flex-wrap justify-center bg-white shadow-xl rounded-lg -mt-64 py-16 px-12 relative z-10">
            <div className="w-full text-center lg:w-8/12">
              <p className="text-4xl text-center">
                <span role="img" aria-label="love">
                  😍
                </span>
              </p>
              <h3 className="font-semibold text-3xl">
                Do you love this Starter Kit?
              </h3>
              <p className="text-blueGray-500 text-lg leading-relaxed mt-4 mb-4">
                Cause if you do, it can be yours now. Hit the buttons below to
                navigate to get the Free version for your next project. Build a
                new web app or give an old project a new look!
              </p>
              <div className="sm:block flex flex-col mt-10">
                <a
                  href="https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus?ref=nr-index"
                  target="_blank"
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-2 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  Get started
                </a>
                <a
                  href="https://github.com/creativetimofficial/notus-react?ref=nr-index"
                  target="_blank"
                  className="github-star sm:ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
                >
                  <i className="fab fa-github text-lg mr-1"></i>
                  <span>Help With a Star</span>
                </a>
              </div>
              <div className="text-center mt-16"></div>
            </div>
          </div>
        </div> */}
        </section>
        <Footer />
      </div>
    );
  }
}

export default Index;
