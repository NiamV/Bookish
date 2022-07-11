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

  let handleSearch = (event) => {
    event.preventDefault()
    showBooksByTitle(event.target[0].value)
  }

  let showBooksByTitle = (data) => {
    props.apiService.book(true, data).then((books) => {
      setBooks(books)
    })
  }

  return (
      <HomeDiv>
        <HomeTitleContainer>
          <HomeTitleTag>Status:</HomeTitleTag>
          <li>{props.okStatus}!</li>
          <button type="button" onClick={showBooks}>See all books!</button>

          <form onSubmit={handleSearch}>
            <input type="text"></input>
            <input type="submit"></input>
          </form>


          {books.books.map((value, index) => {
            return <p key="{value.isbn}">{value.title} by {value.author} (ISBN: {value.isbn})</p>
          })}

        </HomeTitleContainer>
      </HomeDiv>
  );
}
