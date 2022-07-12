import React, {useState} from "react"

export function BookCreate(props) {

    const [numberCopies, setNumberCopies] = useState(undefined)
    const [result, setResult] = useState(undefined)

    let createBook = (event) => {
        event.preventDefault()
        
        let bookName = event.target.book_name.value;
        let bookAuthor = event.target.book_author.value;
        let bookIsbn = event.target.book_isbn.value;
        let numCopies = parseInt(event.target.number_copies.value);

        
        props.apiService.createBook(bookName, bookAuthor, bookIsbn, numCopies).then((response) => {
            setResult(response.message);
        }).catch((error) => {
            setResult(error.message)
        });
    }

    let validateNumberCopies = (event) => {
        setNumberCopies((value) => (event.target.validity.valid ? event.target.value : value))
    }

    return (
        <div>
            <form onSubmit={createBook}>
                <input type="text" id="book_name" placeholder="Book Name" />
                <input type="text" id="book_author" placeholder="Book Author" />
                <input type="text" id="book_isbn" placeholder="Book ISBN" />
                <input type="text" id="number_copies" pattern="[0-9]*" placeholder="Number of copies" onChange={validateNumberCopies} value={numberCopies}/>
                <input type="submit" value="Create"/> 
            </form>

            {
            result !== undefined && <p>{result}</p>
            }
        </div>
    )

}