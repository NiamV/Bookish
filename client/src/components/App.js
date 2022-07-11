import React, { Component, useState } from "react";
import { Container } from "reactstrap";
import { HomePage } from "./homePage/HomePage";
import { ApiService } from "./ApiService";

export default function App() {
  const apiService = new ApiService()
  const [state, setState] = useState(BLANK_STATE);

  let example = () => {
    apiService.example().then((example) => {
      initialize(example);
    });
  };

  let initialize = (example) => {
    this.setState({ example });
  };

  if (state === BLANK_STATE) {
    example()
  }


  return (
    <div>
      <Container>
          <HomePage okStatus={this.state.example.status}/>
      </Container>
    </div>
  );
}

const BLANK_STATE = {
  example: {
    status: null
  }
};
