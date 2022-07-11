import React, { Component } from "react";
import {
  HomeDiv,
  HomeTitleTag,
  HomeTitleContainer,
} from "./HomeComponents";

export type HomeState = {
  example: {
      id: any
      data1: any
  }
}

export class HomePage extends Component<{}, HomeState> {
  constructor(props: HomeState) {
    super(props);

    this.state = {example: props.example};
  }

  render() {
    return (
      <HomeDiv>
        <HomeTitleContainer>
          <HomeTitleTag>Example</HomeTitleTag>
          <li>{this.state.example.data1}</li>
        </HomeTitleContainer>
      </HomeDiv>
    );
  }
}