from bookish.app import db


class Copy(db.Model):
    # This sets the name of the table in the database
    __tablename__ = 'Copies'

    # Here we outline what columns we want in our database
    copy_id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    isbn = db.Column(db.String())
    user_checked_out = db.Column(db.Integer())
    due_date = db.Column(db.Date())

    def __init__(self, isbn, user_checked_out, due_date):
        self.isbn = isbn
        self.user_checked_out = user_checked_out
        self.due_date = due_date

    def __repr__(self):
        return '< copy_id {}>'.format(self.copy_id)

    def serialize(self):
        return {
            'due_date': self.due_date,
            'isbn': self.isbn,
            'user_checked_out': self.user_checked_out,
            'copy_id': self.copy_id
        }
