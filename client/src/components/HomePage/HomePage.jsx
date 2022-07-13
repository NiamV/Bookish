import React, { useState } from "react"
import { BookSearch } from "./BookSearch/BookSearch"
import { BookDisplay } from "./BookDisplay/BookDisplay";
import { BookishHeader } from "../BookishNavbar/BookishNavbar"
import {
  HomeTitleTag,
  HomeTitleContainer,
  HomeSubTitleTag,
  HomeSubTitleContainer
} from "./HomeComponents";
import "./HomePage.css"

export function HomePage(props) {

  const [books, setBooks] = useState([]);

  return (
    <div>
      <BookishHeader />
      <HomeTitleContainer>
        <HomeTitleTag>BOOKISH</HomeTitleTag>
        <br />
        <HomeSubTitleContainer>
          <HomeSubTitleTag>A library management system you can trust.</HomeSubTitleTag>
        </HomeSubTitleContainer>
      </HomeTitleContainer>

      <BookSearch books={books} setBooks={setBooks} />
      <BookDisplay books={books} setBooks={setBooks} />
    </div>
  );
}
