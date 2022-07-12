from bookish.app import db


class User(db.Model):
    # This sets the name of the table in the database
    __tablename__ = 'Users'

    # Here we outline what columns we want in our database
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    name = db.Column(db.String())
    access_token = db.Column(db.String())

    def __init__(self, name, access_token):
        self.name = name
        self.access_token = access_token

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'access_token': self.access_token
        }