from app.models import db, Note, environment, SCHEMA
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_notes():
    note3 = Note(
    user_id=2,
    notebook_id=4,
    title='User 2 Third Note',
    content='This is my third note.',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )
    note4 = Note(
    user_id=2,
    notebook_id=4,
    title='User 2 Fourth Note',
    content='This is my fourth note.',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )
    note5 = Note(
    user_id=3,
    notebook_id=5,
    title='User 3 Fifth Note',
    content='This is my fifth note.',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )
    note6 = Note(
    user_id=3,
    notebook_id=5,
    title='User 3 Fifth Note',
    content='User 3 This is my fifth note.',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )
    note7 = Note(
        user_id=1,
        notebook_id=1,
        title='Nubian Goat',
        content='Nubian goats are a popular dairy breed known for their long, pendulous ears and high butterfat content in their milk.',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    note8 = Note(
        user_id=1,
        notebook_id=1,
        title='Boer Goat',
        content='Boer goats are a meat breed originating from South Africa and known for their rapid weight gain and large size.',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    note9 = Note(
        user_id=1,
        notebook_id=1,
        title='Alpine Goat',
        content='Alpine goats are a dairy breed known for their high milk production and sturdy, athletic build.',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    note10 = Note(
        user_id=1,
        notebook_id=2,
        title='LaMancha Goat',
        content='LaMancha goats are a dairy breed with almost nonexistent ears and known for their calm and docile temperaments.',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    note11 = Note(
        user_id=1,
        notebook_id=2,
        title='Pygmy Goat',
        content='Pygmy goats are a small breed originally from Africa and popular as pets due to their hardiness and friendly personalities.',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    note12 = Note(
        user_id=1,
        notebook_id=2,
        title='Saanen Goat',
        content='Saanen goats are a Swiss dairy breed known for their high milk production and gentle disposition.',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    note13 = Note(
    user_id=1,
    notebook_id=3,
    title='Michael Jordan',
    content='Michael Jordan is a retired professional basketball player widely considered to be one of the greatest of all time.',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )

    note14 = Note(
    user_id=1,
    notebook_id=3,
    title='LeBron James',
    content='LeBron James is a current professional basketball player who has won four NBA championships and is often compared to Michael Jordan.',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )

    note15 = Note(
    user_id=1,
    notebook_id=3,
    title='Tom Brady',
    content='Tom Brady is a professional American football quarterback who has won seven Super Bowl championships, more than any other player in history.',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )

    note16 = Note(
    user_id=1,
    notebook_id=3,
    title='Muhammad Ali',
    content='Muhammad Ali was a legendary professional boxer who is widely considered to be one of the greatest boxers of all time and a cultural icon.',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )

    note17 = Note(
    user_id=1,
    notebook_id=3,
    title='Lionel Messi',
    content='Lionel Messi is a professional football player from Argentina who has won numerous awards and is widely considered to be one of the greatest football players of all time.',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )
    


    db.session.add(note7)
    db.session.add(note8)
    db.session.add(note9)
    db.session.add(note10)
    db.session.add(note11)
    db.session.add(note12)
    db.session.add(note13)
    db.session.add(note14)
    db.session.add(note15)
    db.session.add(note16)
    db.session.add(note17)
    db.session.add(note3)
    db.session.add(note4)
    db.session.add(note5)
    db.session.add(note6)
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