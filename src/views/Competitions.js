/*eslint-disable*/
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
// import AwesomeSlider from "react-awesome-slider";
// import "react-awesome-slider/dist/styles.css";
import ProgressBar from "react-bootstrap/ProgressBar";
// import { ProgressBar } from "bootstrap";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import { auto } from "@popperjs/core";
import Competition from "./SingleCompetition/Competition";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import React, { Component } from "react";
import Section1 from "./Section-1/section-1";

class Competitions extends Component {
  render() {
    return (
      <div>
        <Section1 />
        <br />
        <br />
        <br />
        <br />
        <br/><br/><br/><br/><br/><br/><br/>
        <br />
        <br />
        <br />
        <br />
        <Footer />
      </div>
    );
  }
}

export default Competitions;
// export default function Competitions() {
//   return (
//     <>
//       {/* <IndexNavbar fixed /> */}

//       <section
//         className=" pb-20 relative bg-blueGray-100"
//         style={{ paddingTop: "15px" }}
//       >
//         <div
//           className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
//           style={{ transform: "translateZ(0)" }}
//         >
//           <svg
//             className="absolute bottom-0 overflow-hidden"
//             xmlns="http://www.w3.org/2000/svg"
//             preserveAspectRatio="none"
//             version="1.1"
//             viewBox="0 0 2560 100"
//             x="0"
//             y="0"
//           >
//             <polygon
//               className="text-blueGray-100 fill-current"
//               points="2560 0 2560 100 0 100"
//             ></polygon>
//           </svg>
//         </div>
//         <div className="container mt-5 mx-auto">
//           <div className="container mx-auto px-4">
//             <div className="flex flex-wrap">
//               <div className="lg:pt-12 pt-6 w-full px-4 ">
//                 <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
//                   <div className="px-4 py-5 flex-auto text-center">
//                     <h6
//                       className="text-x1 font-semibold mb-3"
//                       style={{ fontSize: "26px" }}
//                     >
//                       Active Competitions
//                     </h6>

//                     <div
//                       style={{
//                         maxWidth: "100%",
//                         justifyContent: "center",
//                         display: "block",
//                         marginLeft: auto,
//                         marginRight: auto,
//                       }}
//                     >
//                       <div className="justify-evenly flex flex-wrap">
//                         <Link to="competition">
//                           <div className="bg-emerald-500 w-200 h-150 m-20 rounded-lg">
//                             <ProgressBar animated now={45} />
//                           </div>
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="block relative z-1 bg-blueGray-600">
//         <div className="container mx-auto">
//           <div className="justify-center flex flex-wrap">
//             <div className="w-full lg:w-12/12 px-4  -mt-24">
//               <div className="justify-center text-center flex flex-wrap mt-24">
//                 <div className="w-full md:w-6/12 px-12 md:px-4">
//                   <h2
//                     className="font-semibold text-4xl mt-2"
//                     style={{ color: "white" }}
//                   >
//                     Order Of Payment
//                   </h2>
//                   <br />
//                   <hr />
//                   <br />
//                   <p>
//                     <i
//                       class="fab fa-paypal"
//                       style={{
//                         color: "white",
//                         fontSize: "34px",
//                         marginTop: "30px",
//                       }}
//                     ></i>
//                     <h3 style={{ color: "white", fontSize: "30px" }}>ᑭᗩYᑭᗩᒪ</h3>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 bg-blueGray-600 overflow-hidden"></section>

//       <section className="pb-16 bg-blueGray-200 relative pt-32">
//         <div
//           className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
//           style={{ transform: "translateZ(0)" }}
//         >
//           <svg
//             className="absolute bottom-0 overflow-hidden"
//             xmlns="http://www.w3.org/2000/svg"
//             preserveAspectRatio="none"
//             version="1.1"
//             viewBox="0 0 2560 100"
//             x="0"
//             y="0"
//           >
//             <polygon
//               className="text-blueGray-200 fill-current"
//               points="2560 0 2560 100 0 100"
//             ></polygon>
//           </svg>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// }
