import React, { useState } from "react"
import { BookSearch } from "../BookSearch/BookSearch"
import { BookDisplay } from "../BookDisplay/BookDisplay";
import {
  HomeDiv,
  HomeTitleTag,
  HomeTitleContainer,
  HomeSubTitleTag,
  HomeSubTitleContainer
} from "./HomeComponents";
import "./HomePage.css"

export function HomePage(props) {

  const [books, setBooks] = useState([]);

  return (
      <HomeDiv>
        <HomeTitleContainer>
          <HomeTitleTag>BOOKISH</HomeTitleTag>
          <br />
          <HomeSubTitleContainer>
            <HomeSubTitleTag>A library management system you can trust.</HomeSubTitleTag>
          </HomeSubTitleContainer>
        </HomeTitleContainer>
        
        <BookSearch apiService={props.apiService} books={books} setBooks={setBooks} />
        <BookDisplay apiService={props.apiService} books={books} setBooks={setBooks} />
      </HomeDiv>
  );
}
