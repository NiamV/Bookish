from bookish.app import db


class Book(db.Model):
    # This sets the name of the table in the database
    __tablename__ = 'Books'

    # Here we outline what columns we want in our database
    isbn = db.Column(db.String(), primary_key=True)
    title = db.Column(db.String())
    author = db.Column(db.String())

    def __init__(self, isbn, title, author):
        self.isbn = isbn
        self.title = title
        self.author = author

    def __repr__(self):
        return '<isbn {}>'.format(self.isbn)

    def serialize(self):
        return {
            'isbn': self.isbn,
            'title': self.title,
            'author': self.author
        }
