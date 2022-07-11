import React, { Component } from "react";
import { Route } from "react-router";
import { Container } from "reactstrap";
import { HomePage } from "./homepage/HomePage";
import { ApiService } from "./ApiService";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.apiService = new ApiService();
    this.state = BLANK_STATE;
  }

  example = () => {
    this.apiService.healthcheck().then((example) => {
      this.initialize(example);
    });
  };

  initialize = (example) => {
    this.setState({ example });
  };

  render() {
    this.example();

    return (
      <div>
        <Container>
          <Route exact path="/">
            <HomePage example={this.state.example} />
          </Route>
        </Container>
      </div>
    );
  }
}

const BLANK_STATE = {
  example: {
    id: null,
    data1: null,
    data2: null
  },
};
