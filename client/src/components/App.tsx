import React, {Component} from 'react';
import logo from '../logo.svg';
import '../App.css';
import {ApiService} from "./ApiService";
import { Route } from "react-router";
import { Container } from "reactstrap";
import { HomePage, HomeState } from "./homePage/HomePage";

type AppState = {
  example: {
    id: any
    data1: any
  }
}

class App extends Component<{}, AppState> {
  private apiService: ApiService;

  constructor(props: any) {
    super(props);

    this.apiService = new ApiService();
    this.state = BLANK_STATE;
  }

  example = () => {
    this.apiService.example().then((example: Response) => {
        this.initialise(example as unknown as AppState)
      }
    )
  }

  initialise = (example: AppState) => {
    this.setState(example)
  }

  render() {
    this.example()

    return (
        <div>
        <Container>
          <Route exact path="/">
            <HomePage example={this.state as unknown as HomeState} />
          </Route>
        </Container>
      </div>
    );
  }
}

const BLANK_STATE: AppState = {
  example: {
    id: null,
    data1: null
  }
}

export default App;
