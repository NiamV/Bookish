"""empty message

Revision ID: cefbd9ca8d8a
Revises: a4c4118707d9
Create Date: 2022-07-11 09:20:24.791823

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cefbd9ca8d8a'
down_revision = 'a4c4118707d9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('Users')
    op.add_column('Copies', sa.Column('copy_id', sa.Integer(), autoincrement=True, nullable=False))
    op.add_column('Copies', sa.Column('user_checked_out', sa.Integer(), nullable=True))
    op.add_column('Copies', sa.Column('due_date', sa.Date(), nullable=True))
    op.drop_column('Copies', 'userCheckedOut')
    op.drop_column('Copies', 'copyID')
    op.drop_column('Copies', 'dueDate')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('Copies', sa.Column('dueDate', sa.DATE(), autoincrement=False, nullable=True))
    op.add_column('Copies', sa.Column('copyID', sa.INTEGER(), server_default=sa.text('nextval(\'"Copies_copyID_seq"\'::regclass)'), autoincrement=True, nullable=False))
    op.add_column('Copies', sa.Column('userCheckedOut', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_column('Copies', 'due_date')
    op.drop_column('Copies', 'user_checked_out')
    op.drop_column('Copies', 'copy_id')
    op.create_table('Users',
    sa.Column('id', sa.INTEGER(), server_default=sa.text('nextval(\'"Users_id_seq"\'::regclass)'), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('accessToken', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='Users_pkey')
    )
    # ### end Alembic commands ###
