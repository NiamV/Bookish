import React, { Component, useState } from "react";
import {
  HomeDiv,
  HomeTitleTag,
  HomeTitleContainer,
} from "./HomeComponents";

export function HomePage(props) {
  const [books, setBooks] = useState({books: []});

  let showBooks = () => {
    props.apiService.books().then((books) => {
      setBooks(books)
    })
  }

  let showBooksByTitle = () => {
    props.apiService.book(true,data).then((books) => {
      setBooks(books)
    })
  }

  return (
      <HomeDiv>
        <HomeTitleContainer>
          <HomeTitleTag>Status:</HomeTitleTag>
          <li>{props.okStatus}!</li>
          <button type="button" onClick={showBooks}>See all books!</button>

          <form>
            <input type="text"></input>
            <input type="submit" onClick={showBooksByTitle()}></input>
          </form>


          {books.books.map((value, index) => {
            return <p>{value.title} by {value.author} (ISBN: {value.isbn})</p>
          })}

        </HomeTitleContainer>
      </HomeDiv>
  );
}
