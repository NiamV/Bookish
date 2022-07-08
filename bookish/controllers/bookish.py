import sqlalchemy.exc
from flask import request
from bookish.models.books import Book
from bookish.models.users import User
from bookish.models.copies import Copy

from bookish.models import db


def bookish_routes(app):
    @app.route('/healthcheck')
    def health_check():
        return {"status": "OK"}

    @app.route('/book/create', methods=['POST'])
    def add_book():
        if not request.is_json:
            return { "error": "The request payload is not in JSON format" }

        data = request.get_json()

        if 'isbn' not in data:
            return { "error": "No ISBN was provided" }
        elif 'author' not in data:
            return { "error": "No author was provided" }
        elif 'title' not in data:
            return { "error": "No title was provided" }

        isbn = data['isbn']
        author = data['author']
        title = data['title']
        copies = data['copies']

        book = Book(isbn, title, author)
        db.session.add(book)

        try:
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            return { "error": "Book with ISBN already exists." }

        for i in range(int(copies)):
            db.session.add(Copy(isbn, -1, None))
        db.session.commit()


        return { "message": "Book has been successfully created." }

    @app.route('/books', methods=['GET'])
    def get_books():
        books = Book.query.all()
        results = [
            {
                'isbn': book.isbn,
                'title': book.title,
                'author': book.author
            } for book in sorted(books, key = lambda b: b.title)]
        return {"books": results}

    @app.route('/user', methods=['POST'])
    def get_user():
        if not request.is_json:
            return { "error": "The request payload is not in JSON format" }

        data = request.get_json()

        if 'user' not in data:
            return { "error": "No user was provided" }

        user = data['user']
        userbooks = db.session.query(Book.title, Copy.dueDate).filter(Book.isbn == Copy.isbn).filter(Copy.userCheckedOut == user)

        results = [
            {
                'title': userbook.title,
                'dueDate': userbook.dueDate,
            } for userbook in userbooks]
        return {"books for user": results}

    @app.route('/book/copies', methods=['POST'])
    def get_copies():
        if not request.is_json:
            return {"error": "The request payload is not in JSON format"}

        data = request.get_json()

        if 'isbn' not in data:
            return {"error": "No isbn was provided"}

        isbn = data['isbn']

        copies = db.session.query(Copy.dueDate, Copy.userCheckedOut).filter(Copy.isbn == isbn)
        unavailable_copies = copies.filter(Copy.dueDate is not None)

        results = [
            {
                'dueDate': copy.dueDate,
                'userCheckedOut': copy.userCheckedOut
            } for copy in unavailable_copies
        ]

        total_copies = 0
        for copy in copies:
            total_copies += 1

        available_copies = total_copies
        for copy in unavailable_copies:
            available_copies -= 1

        return {
            "total_copies": total_copies,
            "available_copies": available_copies,
            "due_dates": results
        }

    @app.route('/searchbook', methods = ['POST'])
    def search_book():
        if not request.is_json:
            return {"error": "The request payload is not in JSON format"}

        data = request.get_json()

        if 'title' in data:
            title = data['title']
            books = db.session.query(Book.isbn, Book.title, Book.author).filter(Book.title == title)

            results = [
                {
                    'isbn': book.isbn,
                    'title': book.title,
                    'author': book.author
                } for book in books
            ]

            return {"books": results}
        elif 'author' in data:
            author = data['author']

            books = db.session.query(Book.isbn, Book.title, Book.author).filter(Book.author == author)

            results = [
                {
                    'isbn': book.isbn,
                    'title': book.title,
                    'author': book.author
                } for book in books
            ]

            return {"books": results}