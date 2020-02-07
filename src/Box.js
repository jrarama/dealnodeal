import React from "react";
import { rollIn } from "react-animations";
import Radium, { StyleRoot } from "radium";
import caseClosed from "./img/closed-case.png";
import caseOpened from "./img/open-case.png";

const styles = {
  bounce: {
    animation: "x 2s",
    animationName: Radium.keyframes(rollIn, "bounce")
  }
};

export default class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state  = {
      opened: false,
      hidden: false
    };
  }

  handleClick() {
    if (this.state.opened) {
      console.log("Opened already.");
      return;
    }
    var state = JSON.parse(JSON.stringify(this.state));
    state.opened = true;

    this.setState(state);

    console.log(this.state);
    this.props.onClick();
  }

  render() {
    return (
      <StyleRoot className="box-root">
        <div
          className={"box" + (this.state.opened ? " opened" : " closed") }
          style={styles.bounce}
          onClick={() => this.handleClick()}
        >
          <img src={this.state.opened ? caseOpened : caseClosed} className="box-img" />
          <label className="box-label">{this.props.number}</label>
        </div>
      </StyleRoot>
    );
  }
}
