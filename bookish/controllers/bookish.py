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
            db.session.add(Copy(isbn, -1, -1))
        db.session.commit()


        return { "message": "Book has been successfully created." }

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
