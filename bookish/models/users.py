from bookish.app import db


class User(db.Model):
    # This sets the name of the table in the database
    __tablename__ = 'Users'

    # Here we outline what columns we want in our database
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String())
    accessToken = db.Column(db.String())

    def __init__(self, id, name, accessToken):
        self.id = id
        self.name = name
        self.accessToken = accessToken

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'accessToken': self.accessToken
        }