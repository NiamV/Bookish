from bookish.app import db


class Copy(db.Model):
    # This sets the name of the table in the database
    __tablename__ = 'Copies'

    # Here we outline what columns we want in our database
    copyID = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    isbn = db.Column(db.String())
    userCheckedOut = db.Column(db.Integer())
    dueDate = db.Column(db.Date())

    def __init__(self, isbn, userCheckedOut, dueDate):
        self.isbn = isbn
        self.userCheckedOut = userCheckedOut
        self.dueDate = dueDate

    def __repr__(self):
        return '<copyID {}>'.format(self.copyID)

    def serialize(self):
        return {
            'dueDate': self.dueDate,
            'isbn': self.isbn,
            'userCheckedOut': self.userCheckedOut,
        }
