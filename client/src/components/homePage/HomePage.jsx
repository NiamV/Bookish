import React, { Component, useState } from "react";
import {
  HomeDiv,
  HomeTitleTag,
  HomeTitleContainer,
} from "./HomeComponents";

export class HomePage extends Component{
  // const [status, setStatus] = useState(null);
  //
  // function handleStatus(status) {
  //   setStatus(status)
  // }
  render() {
    return (
        <HomeDiv>
          <HomeTitleContainer>
            <HomeTitleTag>Status:</HomeTitleTag>
            <li>{this.props.okStatus}!</li>
          </HomeTitleContainer>
        </HomeDiv>
    );
  }
}
