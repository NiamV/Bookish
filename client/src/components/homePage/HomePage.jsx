import React, { Component, useState } from "react";
import {
  HomeDiv,
  HomeTitleTag,
  HomeTitleContainer,
} from "./HomeComponents";

export function HomePage() {
  const [status, setStatus] = useState(null);

  function handleStatus(status) {
    setStatus(status)
  }

  return (
    <HomeDiv>
      <HomeTitleContainer>
        <HomeTitleTag>Status:</HomeTitleTag>
        <li>{status}!</li>
      </HomeTitleContainer>
    </HomeDiv>
  );
}
