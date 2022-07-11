import sqlalchemy.exc
from flask import request
from bookish.models.book import Book
from bookish.models.user import User
from bookish.models.copy import Copy

from bookish.models import db


def bookish_routes(app):
    @app.route('/healthcheck')
    def health_check():
        return {"status": "OK"}

    @app.route('/book/create', methods=['POST'])
    def add_book():
        if not request.is_json:
            return {"error": "The request payload is not in JSON format"}

        data = request.get_json()

        if 'isbn' not in data:
            return {"error": "No ISBN was provided"}
        elif 'author' not in data:
            return {"error": "No author was provided"}
        elif 'title' not in data:
            return {"error": "No title was provided"}

        isbn = data['isbn']
        author = data['author']
        title = data['title']
        copies = data['copies']

        book = Book(isbn, title, author)
        db.session.add(book)

        try:
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            return {"error": "Book with ISBN already exists."}

        for i in range(int(copies)):
            db.session.add(Copy(isbn, -1, None))
        db.session.commit()

        return {"message": "Book has been successfully created."}

    @app.route('/books', methods=['GET'])
    def get_books():
        books = Book.query.all()
        results = [
            {
                'isbn': book.isbn,
                'title': book.title,
                'author': book.author
            } for book in sorted(books, key=lambda b: b.title)]
        return {"books": results}



    @app.route('/book/copies', methods=['POST'])
    def get_copies():
        if not request.is_json:
            return {"error": "The request payload is not in JSON format"}

        data = request.get_json()

        if 'isbn' not in data:
            return {"error": "No isbn was provided"}

        isbn = data['isbn']

        copies = db.session.query(Copy.due_date, Copy.user_checked_out).filter(Copy.isbn == isbn)
        unavailable_copies = copies.filter(Copy.due_date is not None)

        results = [
            {
                'due_date': copy.due_date,
                'user_checked_out': copy.user_checked_out
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

    @app.route('/searchbook', methods=['POST'])
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

    @app.route('/user/assign', methods=['POST'])
    def assign_copy():
        if not request.is_json:
            return {"error": "The request payload is not in JSON format"}

        data = request.get_json()

        if 'id' not in data:
            return {"error": "No id was provided"}
        if 'copy_id' not in data:
            return {"error": "No  copy_id was provided"}
        if 'due_date' not in data:
            return {"error": "No due_date was provided"}

        id = data['id']
        copy_id = data['copy_id']
        due_date = data['due_date']

        db.session.query(Copy).filter(Copy. copy_id ==  copy_id).update({'user_checked_out': id, 'due_date': due_date})
        db.session.commit()

        return {"message": "Assigned book with copy ID " + str( copy_id) + " to user with id " + str(id) + " due on " + str(due_date)}