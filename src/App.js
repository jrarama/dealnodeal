import React from "react";
import "./index.css";
import Box from "./Box";
import { swing, flip } from "react-animations";
import Radium, { StyleRoot } from "radium";
import caseOpened from "./img/open-case.png";
import happy from "./img/happy.png";
import sad from "./img/sad.png";
import background from "./img/background.jpg"
import title from "./img/title.png"

const styles = {
  swing: {
    animation: "x 2s",
    animationName: Radium.keyframes(swing, "swing")
  },
  flip: {
    animation: "x 4s",
    animationName: Radium.keyframes(flip, "flip")
  }
};

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      popHidden: true,
      winner: 1
    };

    this.winArr = [];
  }

  shuffleArray (array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  createTables (wins, loss) {
    this.winArr = Array(wins).fill(1).concat(Array(loss).fill(0));
    this.shuffleArray(this.winArr);

    var boxes = [];
    for (let i = 0; i < this.winArr.length; i++) {
      boxes.push(
        <Box number={i + 1}
          winner = {this.winArr[i]}
          onClick={() => this.popOpen(i)}
          key={i}
          />
        );
    }

    return boxes;
  }

  render() {
    return (
      <div className="App">
        <StyleRoot style={styles.flip} >
          <img src={title} className="game-title" />
        </StyleRoot>

        <div className="cases">{this.createTables(16, 5)}</div>

        <div
          className={"overlay" + (this.state.popHidden ? " hidden" : "")}
          onClick={() => this.popClose()}
        >

        <StyleRoot className="box-root" style={styles.swing} >
            <img src={caseOpened} className={"box-popup" + (this.state.popHidden ? " hidden" : "") } />
            <img src={this.state.winner === 1 ? happy: sad } className={"smiley" + (this.state.popHidden ? " hidden" : "") } />
        </StyleRoot>
        </div>

      </div>
    );
  }

  popClose(index) {
    console.log("Closing popup");
    this.setState({ popHidden: true, winner: this.winArr[index] });
  }

  popOpen(index) {
    console.log("Opening popup");
    this.setState({ popHidden: false, winner: this.winArr[index] });
  }
}

export default App;
