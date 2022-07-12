from bookish.controllers.book_controller import book_routes
from bookish.controllers.user_controller import user_routes


def register_controllers(app):
    book_routes(app)
    user_routes(app)
