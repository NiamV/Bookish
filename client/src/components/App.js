import React, { Component, useEffect } from "react";
import { Container } from "reactstrap";
import { HomePage } from "./HomePage/HomePage";
import { ApiService } from "./ApiService";

export default class App extends Component {
  constructor() {
    super();

    this.apiService = new ApiService();
    this.state = BLANK_STATE;
  }

  example = () => {
    this.apiService.example().then((example) => {
      this.initialize(example);
    });
  };

  initialize = (example) => {
    useEffect(() => {

    });
  };

  render() {
    if (this.state === BLANK_STATE) {
      this.example()
    }


    return (
      <div>
        <Container>
            <HomePage/>
        </Container>
      </div>
    );
  }
}

const BLANK_STATE = {
  example: {
    status: null
  }
};
