import React, { Component } from "react";
import {
  HomeDiv,
  HomeTitleTag,
  HomeTitleContainer,
} from "./HomeComponents";

export class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {example: props.example};
  }

  render() {
    return (
      <HomeDiv>
        <HomeTitleContainer>
          <HomeTitleTag>Example</HomeTitleTag>
        </HomeTitleContainer>
      </HomeDiv>
    );
  }
}
