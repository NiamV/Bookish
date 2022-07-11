import React, { Component } from "react";
import {
  HomeDiv,
  HomeTitleTag,
  HomeTitleContainer,
} from "./HomeComponents";

export class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      books: []
    }
  }

  showBooks = () => {
    this.props.apiService.books().then((books) => {
      this.setState(books)
    })
  }

  render() {
    console.log(this.state)
    return (
        <HomeDiv>
          <HomeTitleContainer>
            <HomeTitleTag>Status:</HomeTitleTag>
            <li>{this.props.okStatus}!</li>
            <button type="button" onClick={this.showBooks}>See all books!</button>

            {this.state.books.map((value, index) => {
              return <p>{value.title} by {value.author} (ISBN: {value.isbn})</p>
            })}
          
          </HomeTitleContainer>
        </HomeDiv>
    );
  }
}
