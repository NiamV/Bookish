import React, { Component, useState } from "react";
import {
  HomeDiv,
  HomeTitleTag,
  HomeTitleContainer,
} from "./HomeComponents";

export function HomePage(props) {
  const [books, setBooks] = useState([]);
  const [searchType, setSeatchType] = useState("title")

  let showBooks = () => {
    props.apiService.books().then((bookResponse) => {
      if (bookResponse === {}) {
        setBooks([])
      } else {
        setBooks(bookResponse.books)
      }
      
    })
  }

  let handleSearch = (event) => {
    event.preventDefault()
    showBooksByTitle(event.target[0].value)
  }

  let showBooksByTitle = (data) => {
    props.apiService.book(searchType, data).then((bookResponse) => {
      if (bookResponse === {}) {
        setBooks([])
      } else {
        setBooks(bookResponse.books)
      }
    })
  }

  let onRadioChange = (event) => {
    setSeatchType(event.target.value)
  }

  return (
      <HomeDiv>
        <HomeTitleContainer>
          <HomeTitleTag>Status:</HomeTitleTag>
          <li>{props.okStatus}!</li>
          <button type="button" onClick={showBooks}>See all books!</button>

          <form onSubmit={handleSearch}>
            <input type="text" />
            <input type="radio" checked={searchType === 'title'} onChange={onRadioChange} value="title"/>By Title
            <input type="radio" checked={searchType === 'author'} onChange={onRadioChange} value="author"/>By Author
            <input type="submit" />
          </form>


          {books.map((value, index) => {
            return <p key="{value.isbn}">{value.title} by {value.author} (ISBN: {value.isbn})</p>
          })}

        </HomeTitleContainer>
      </HomeDiv>
  );
}
