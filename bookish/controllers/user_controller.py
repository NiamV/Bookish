import sqlalchemy
from flask import request
from bookish.models.book import Book
from bookish.models.copy import Copy
from bookish.models.user import User

from bookish.models import db


def user_routes(app):
    @app.route('/user', methods=['POST'])
    def get_user():
        if not request.is_json:
            return {"error": "The request payload is not in JSON format"}

        data = request.get_json()

        if 'user' not in data:
            return {"error": "No user was provided"}

        user = data['user']
        userbooks = db.session.query(Book.title, Copy.due_date).filter(Book.isbn == Copy.isbn).filter(
            Copy.user_checked_out == user)

        results = [
            {
                'title': userbook.title,
                'due_date': userbook.due_date,
            } for userbook in userbooks]
        return {"books_for_user": results}

    @app.route('/user/name', methods=['POST'])
    def get_user_name():
        if not request.is_json:
            return {"error": "The request payload is not in JSON format"}

        data = request.get_json()

        if 'user' not in data:
            return {"error": "No user was provided"}

        user = data['user']
        user_name = db.session.query(User.name).filter(User.id == user)

        return {"user_name": list(user_name)[0].name}

    @app.route('/user/isUser', methods=['POST'])
    def checkUser():
        if not request.is_json:
            return {"error": "The request payload is not in JSON format"}

        data = request.get_json()

        if 'user' not in data:
            return {"error": "No user was provided"}

        user = data['user']
        users = db.session.query(User.id).filter(User.id == user)

        return {"result": len(list(users)) != 0}

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

        copy = db.session.query(Copy).filter(Copy.copy_id == copy_id)
        if copy[0].user_checked_out == -1:
            db.session.query(Copy).filter(Copy.copy_id == copy_id).update({'user_checked_out': id, 'due_date': due_date})
            db.session.commit()
        else:
            return {"error": "Book already taken out"}

        return {
            "message": "Assigned book with copy ID " + str(copy_id) + " to user with id " + str(id) + " due on " + str(
                due_date)}

    @app.route('/user/create', methods=['POST'])
    def add_user():
        if not request.is_json:
            return {"error": "The request payload is not in JSON format"}

        data = request.get_json()

        if 'name' not in data:
            return {"error": "No name was provided"}

        name = data['name']

        users = db.session.query(User)
        newID = len(list(users)) + 1

        create_user(name)
        return {"message": "User has been successfully created with library card number: " + str(newID)}


def create_user(name):
    user = User(name, name)
    db.session.add(user)

    try:
        db.session.commit()
    except sqlalchemy.exc.IntegrityError:
        return False

    return True
