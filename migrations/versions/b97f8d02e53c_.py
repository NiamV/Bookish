"""empty message

Revision ID: b97f8d02e53c
Revises: d57f1ab4318d
Create Date: 2022-07-08 15:01:51.874930

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b97f8d02e53c'
down_revision = 'd57f1ab4318d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Books',
    sa.Column('isbn', sa.String(), nullable=False),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('author', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('isbn')
    )
    op.create_table('Copies',
    sa.Column('copy_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('isbn', sa.String(), nullable=True),
    sa.Column('user_checked_out', sa.Integer(), nullable=True),
    sa.Column('due_date', sa.Date(), nullable=True),
    sa.PrimaryKeyConstraint('copy_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('Copies')
    op.drop_table('Books')
    # ### end Alembic commands ###
