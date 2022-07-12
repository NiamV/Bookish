import React, {useState} from "react"
import loadBooks from "../../model/Book"

export function BookDisplay(props) {
    const [books, setBooks] = useState([]);
    const [searchType, setSeatchType] = useState("title")

    let showAllBooks = () => {
        props.apiService.queryBooks().then((bookResponse) => {
            if (bookResponse === {}) {
                setBooks([]);
            } else {
                loadBooks(props.apiService, bookResponse.books).then((books) => {
                    setBooks(books);
                })
            }
        })
    }

    let handleSearch = (event) => {
        event.preventDefault() // Cancels page refreshing
        searchAndShowBook(event.target.search_query.value)
    }

    let searchAndShowBook = (data) => {
        props.apiService.searchBook(searchType, data).then((bookResponse) => {
            if (bookResponse === {}) {
                setBooks([]);
            } else {
                loadBooks(props.apiService, bookResponse.books).then((books) => {
                    setBooks(books);
                })
            }
        })
    }

    let onRadioChange = (event) => {
        setSeatchType(event.target.value)
    }

    return (
        <div>
            <button type="button" onClick={showAllBooks}>Show All Books</button>

            <form onSubmit={handleSearch}>
                <input type="text" id="search_query" placeholder={searchType === 'title' ? "Title" : "Author"} />
                <input type="radio" checked={searchType === 'title'} onChange={onRadioChange} value="title" /> By Title
                <input type="radio" checked={searchType === 'author'} onChange={onRadioChange} value="author" /> By Author
                <input type="submit" value="Search"/>
            </form>


            {books.map((value) => {
                return <p key="{value.isbn}">{value.title} by {value.author} (ISBN: {value.isbn}) (Copies Available: {value.available_copies}/{value.total_copies})</p>
            })}
        </div>
    )
}