from app.models import db, Note, environment, SCHEMA
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_notes():
    note1 = Note(
    user_id=1,
    notebook_id=1,
    title='First Note',
    content='This is my first note.',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )
    note2 = Note(
    user_id=2,
    notebook_id=1,
    title='Second Note',
    content='This is my second note.',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )
    note3 = Note(
    user_id=1,
    notebook_id=2,
    title='Third Note',
    content='This is my third note.',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )
    note4 = Note(
    user_id=2,
    notebook_id=2,
    title='Fourth Note',
    content='This is my fourth note.',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )
    note5 = Note(
    user_id=3,
    notebook_id=3,
    title='Fifth Note',
    content='This is my fifth note.',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )


    db.session.add(note1)
    db.session.add(note2)
    db.session.add(note3)
    db.session.add(note4)
    db.session.add(note5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM notes")
        
    db.session.commit()