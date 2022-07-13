import React, { useState, useContext } from "react"
import loadBooks from "../../../model/Book"

import {
    SearchFormContainer,
    BookSearchBar,
    BookRadio,
    BookSubmit
} from "./SearchComponents";
import {apiContext} from "../../App";

export function BookSearch(props) {
    const [searchType, setSeatchType] = useState("title")

    const apiService = useContext(apiContext)

    let handleSearch = (event) => {
        event.preventDefault() // Cancels page refreshing
        searchAndShowBooks(event.target.search_query.value)
    }

    let searchAndShowBooks = (data) => {
        apiService.searchBook(searchType, data).then((bookResponse) => {
            if (bookResponse === {}) {
                props.setBooks([]);
            } else {
                loadBooks(apiService, bookResponse.books).then((books) => {
                    props.setBooks(books);
                })
            }
        })
    }

    let onRadioChange = (event) => {
        setSeatchType(event.target.value)
    }

    return (
        <div>
            <SearchFormContainer>
                <form onSubmit={handleSearch}>
                    <div display="block">
                        <BookSearchBar type="text" id="search_query" placeholder={searchType === 'title' ? "Search by title..." : "Search by author..."} />
                    </div>

                    <div display="inline">
                        <BookRadio type="radio" checked={searchType === 'title'} onChange={onRadioChange} value="title" /> By Title
                        <BookRadio type="radio" checked={searchType === 'author'} onChange={onRadioChange} value="author" /> By Author
                    </div>


                    <div display="block">
                        <BookSubmit type="image" alt="Submit" src="./search-icon.svg" />
                    </div>
                </form>
            </SearchFormContainer>
        </div>
    )
}