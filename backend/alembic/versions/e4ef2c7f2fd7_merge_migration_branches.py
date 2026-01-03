"""merge migration branches

Revision ID: e4ef2c7f2fd7
Revises: 4266a73833f3, 507cd0d55963, 9f8ff92e1f30
Create Date: 2026-01-03 01:38:40.860883

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e4ef2c7f2fd7'
down_revision: Union[str, None] = ('4266a73833f3', '507cd0d55963', '9f8ff92e1f30')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
