import React from "react"
import {
    SearchedBook
} from "./DisplayComponents"

export function BookDisplay(props) {

/*    let showAllBooks = () => {
        props.apiService.queryBooks().then((bookResponse) => {
            if (bookResponse === {}) {
                setBooks([]);
            } else {
                loadBooks(props.apiService, bookResponse.books).then((books) => {
                    setBooks(books);
                })
            }
        })
    }*/


    return (
        <div>
            {props.books.map((value) => {
                return <SearchedBook key="{value.isbn}">{value.title} by {value.author} (ISBN: {value.isbn}) (Copies Available: {value.available_copies}/{value.total_copies})</SearchedBook>
            })}
        </div>
    )
}