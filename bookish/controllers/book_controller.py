import sqlalchemy.exc
from flask import request
from bookish.models.book import Book
from bookish.models.copy import Copy
from bookish.models import db


def book_routes(app):
    @app.route('/healthcheck')
    def health_check():
        return {"status": "OK"}

    @app.route('/book', methods=['POST'])
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
        elif 'copies' not in data:
            return {"error": "No copies was provided"}

        isbn = data['isbn']
        author = data['author']
        title = data['title']
        copies = data['copies']

        result = create_books(isbn, title, author, copies)
        if not result:
            return {"error": "Book with ISBN already exists."}, 400
        else:
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

    @app.route('/books/upload', methods=['POST'])
    def upload_books():
        uploaded = 0
        for _, file in request.files.items():
            file.readline()
            book_count = {}
            for line in file:
                data = line.decode("utf-8").split(",")
                title = data[1]
                author = data[2]
                isbn = data[7]

                if not is_valid_isbn(isbn):
                    continue

                combination = (isbn, title, author)

                if combination in book_count:
                    book_count[combination] = book_count[combination] + 1
                else:
                    book_count[combination] = 1

            for book_info, count in book_count.items():
                if create_books(book_info[0], book_info[1], book_info[2], count):
                    uploaded += 1

        return {"message": "Uploaded " + str(uploaded) + " books"}

    @app.route('/book/copies', methods=['POST'])
    def get_copies():
        if not request.is_json:
            return {"error": "The request payload is not in JSON format"}

        data = request.get_json()

        if 'isbn' not in data:
            return {"error": "No isbn was provided"}

        isbn = data['isbn']

        copies = db.session.query(Copy.due_date, Copy.user_checked_out).filter(Copy.isbn == isbn)

        results = [
            {
                'due_date': copy.due_date,
                'user_checked_out': copy.user_checked_out
            } for copy in copies
        ]

        available_copies, total_copies = 0, 0
        for copy in copies:
            total_copies += 1
            if copy.due_date is None:
                available_copies += 1

        return {
            "total_copies": total_copies,
            "available_copies": available_copies,
            "copy_information": results
        }


def create_books(isbn, title, author, copies) -> bool:
    book = Book(isbn, title, author)
    db.session.add(book)

    try:
        db.session.commit()
    except sqlalchemy.exc.IntegrityError:
        db.session.rollback()
        return False

    for i in range(int(copies)):
        db.session.add(Copy(isbn, -1, None))
    db.session.commit()
    return True


def is_valid_isbn(isbn):
    # check for length
    if len(isbn) != 10:
        return False

    # Computing weighted sum
    # of first 9 digits
    _sum = 0
    for i in range(9):
        if isbn[i] not in "1234567890":
            return False
        if 0 <= int(isbn[i]) <= 9:
            _sum += int(isbn[i]) * (10 - i)
        else:
            return False

    # Checking last digit
    if (isbn[9] != 'X' and
            0 <= int(isbn[9]) <= 9):
        return False

    # If last digit is 'X', add
    # 10 to sum, else add its value.
    _sum += 10 if isbn[9] == 'X' else int(isbn[9])

    # Return true if weighted sum of
    # digits is divisible by 11
    return (_sum % 11 == 0)
