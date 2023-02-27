from app.models import db, Notebook, environment, SCHEMA
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_notebooks():
    notebook1 = Notebook(
    user_id=1,
    title='Demo My First Notebook',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )
    notebook2 = Notebook(
    user_id=1,
    title='Demo My Second Notebook',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )
    notebook3 = Notebook(
    user_id=2,
    title='User 2 My Third Notebook',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )
    notebook4 = Notebook(
    user_id=2,
    title='User 2 My Second Notebook',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )
    notebook5 = Notebook(
    user_id=3,
    title='User 3 Notebook',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )

    db.session.add(notebook1)
    db.session.add(notebook2)
    db.session.add(notebook3)
    db.session.add(notebook4)
    db.session.add(notebook5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_notebooks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM notebooks")
        
    db.session.commit()