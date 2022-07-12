export class Book {

    constructor(isbn, title, author, copy_information) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.available_copies = copy_information.available_copies;
        this.total_copies = copy_information.total_copies;
        this.copy_information = copy_information.copy_information;
    }

}

export default function loadBooks(apiService, data) {
    return new Promise((resolve) => {
        Promise.all(
        data.map(bookData => {
            return new Promise((resolve) => {
                apiService.queryCopies(bookData.isbn).then((copy_information) => {
                    resolve({book: bookData, copy_information: copy_information})
                });
            })
        })).then(data => {
            let books = []
            for (let book of data) {
                books.push(new Book(book.book.isbn, book.book.title, book.book.author, book.copy_information))
            }

            resolve(books);
        });
    });

}