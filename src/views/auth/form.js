// import { toast } from "react-toastify";
import React from "react";

class Form extends React.Component {
  state = {
    data: {},
  };
  doSubmit = () => {};
  handelSelect = () => {};
  handelSubmit = (e) => {
    e.preventDefault();
    // console.log("submitted");
    this.handelSelect();
    this.doSubmit();
    // toast.success("Submitted");
  };
  handelChange = ({ currentTarget: input }) => {
    const dat = { ...this.state.data };
    
    dat[input.name] = input.value;
    // console.log(dat);
    this.setState({ data: dat });
  };
}

export default Form;
