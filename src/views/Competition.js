import React, { Component } from "react";

import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
// import AwesomeSlider from "react-awesome-slider";
// import "react-awesome-slider/dist/styles.css";
import { ProgressBar } from "react-bootstrap";
// import { ProgressBar } from "bootstrap";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import { auto } from "@popperjs/core";
class Competition extends Component {
  render() {
    return (
      <div>
        <IndexNavbar fixed />

        <section
          className=" pb-20 relative bg-blueGray-100"
          style={{ paddingTop: "15px" }}
        >
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
          <div className="container mt-5 mx-auto">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap">
                <div className="lg:pt-12 pt-6 w-full px-4 ">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto text-center">
                      <h6
                        className="text-x1 font-semibold mb-3"
                        style={{ fontSize: "26px" }}
                      >
                        Title
                      </h6>

                      <div
                        style={{
                          maxWidth: "50%",
                          justifyContent: "center",
                          display: "block",
                          marginLeft: auto,
                          marginRight: auto,
                        }}
                      >
                        <Carousel
                          axis="horizontal"
                          showArrows={false}
                          showStatus={false}
                          width={"100%"}
                        >
                          <div>
                            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80" />
                          </div>
                          <div>
                            <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-silver-config-201810?wid=1078&hei=624&fmt=jpeg&qlt=80&.v=1633033423000" />
                          </div>
                          <div>
                            <img src="https://images.7news.com.au/publication/C-2069324/5f397432ae98e41c8ada6af60f31110b52e7614e.jpg?imwidth=650&impolicy=sevennews_v2" />
                          </div>
                        </Carousel>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="p-20 relative bg-blueGray-100 mt-2">
          <div className="container mt-5 mx-auto">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap">
                <div className="w-full px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-2 flex-auto text-center">
                      <div className="flex flex-wrap"></div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Competition;
