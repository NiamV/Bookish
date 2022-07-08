import sqlalchemy.exc
from flask import request
from bookish.models.example import Example
from bookish.models.books import Book
from bookish.models.users import User
from bookish.models.copies import Copy

from bookish.models import db


def bookish_routes(app):
    @app.route('/healthcheck')
    def health_check():
        return {"status": "OK"}

    @app.route('/book', methods=['POST'])
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

    @app.route('/catalogue', methods=['GET'])
    def get_catalogue():
        books = Book.query.all()
        results = [
            {
                'isbn': book.isbn,
                'title': book.title,
                'author': book.author
            } for book in sorted(books, key = lambda b: b.title)]
        return {"books": results}

    @app.route('/userbooks', methods=['POST'])
    def get_userbooks():
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

    @app.route('/copies', methods=['POST'])
    def get_copies():
        if not request.is_json:
            return {"error": "The request payload is not in JSON format"}

        data = request.get_json()

        if 'isbn' not in data:
            return {"error": "No isbn was provided"}

        isbn = data['isbn']

        copies = db.session.query(Copy.dueDate, Copy.userCheckedOut).filter(Copy.isbn == isbn)
        unavailable_copies = copies.filter(Copy.dueDate != None)

        results = [
            {
                'dueDate': copy.dueDate,
                'userCheckedOut': copy.userCheckedOut
            } for copy in unavailable_copies
        ]

        totalCopies = 0
        for copy in copies:
            totalCopies += 1

        availableCopies = totalCopies
        for copy in unavailable_copies:
            availableCopies -= 1

        return {
            "total_copies": totalCopies,
            "available_copies": availableCopies,
            "due_dates": results
        }

    @app.route('/titleSearch', methods = ['POST'])
    def get_by_title():
        if not request.is_json:
            return {"error": "The request payload is not in JSON format"}

        data = request.get_json()

        if 'title' not in data:
            return {"error": "No title was provided"}

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



    @app.route('/example', methods=['POST', 'GET'])
    def handle_example():
        if request.method == 'POST':
            if request.is_json:
                data = request.get_json()
                new_example = Example(data1=data['data1'], data2=data['data2'])
                db.session.add(new_example)
                db.session.commit()
                return {"message": "New example has been created successfully."}
            else:
                return {"error": "The request payload is not in JSON format"}

        elif request.method == 'GET':
            examples = Example.query.all()
            results = [
                {
                    'id': example.id,
                    'data1': example.data1,
                    'data2': example.data2
                } for example in examples]
            return {"examples": results}
