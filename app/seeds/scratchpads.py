from app.models import db, Scratchpad, environment, SCHEMA
from datetime import datetime

# Adds a demo user, you can add other users here if you want
def seed_scratchpads():
    scratchpad1 = Scratchpad(
    user_id=1,
    content='',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )
    scratchpad2 = Scratchpad(
    user_id=2,
    content='',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )
    scratchpad3 = Scratchpad(
    user_id=3,
    content='',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )

    db.session.add(scratchpad1)
    db.session.add(scratchpad2)
    db.session.add(scratchpad3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_scratchpads():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.scratchpads RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM scratchpads")
        
    db.session.commit()