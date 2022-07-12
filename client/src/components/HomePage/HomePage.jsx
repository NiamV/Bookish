import React from "react"
import { BookCreate } from "../BookCreate/BookCreate";
import { BookDisplay } from "../BookDisplay/BookDisplay";
import { BookUpload } from "../BookUpload/BookUpload"
import {
  HomeDiv
} from "./HomeComponents";

export function HomePage(props) {

  return (
      <HomeDiv>
        <BookDisplay apiService={props.apiService} />
        <BookCreate apiService={props.apiService} />
        <BookUpload apiService={props.apiService} />
      </HomeDiv>
  );
}
