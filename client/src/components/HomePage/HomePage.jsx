import React from "react"
import { BookCreate } from "../BookCreate/BookCreate";
import { BookDisplay } from "../BookDisplay/BookDisplay";
import {
  HomeDiv
} from "./HomeComponents";

export function HomePage(props) {

  return (
      <HomeDiv>
        <BookDisplay apiService={props.apiService}/>
        <BookCreate apiService={props.apiService}/>
      </HomeDiv>
  );
}
