from app.models import db, Task, environment, SCHEMA
from datetime import date


# Adds a demo user, you can add other users here if you want
def seed_tasks():
    tasks = [
        Task(
            user_id=1,
            title="Complete math homework",
            description="Finish exercises 1-10 from chapter 5.",
            due_date=date(2023, 3, 1),
            created_at=date(2023, 2, 20),
            updated_at=date(2023, 2, 20),
        ),
        Task(
            user_id=2,
            title="Buy groceries",
            description="Get milk, eggs, bread, and cheese.",
            due_date=date(2023, 2, 28),
            created_at=date(2023, 2, 19),
            updated_at=date(2023, 2, 19),
        ),
        Task(
            user_id=3,
            title="Call mom",
            description="Check in on her and see how she's doing.",
            due_date=date(2023, 3, 5),
            created_at=date(2023, 2, 18),
            updated_at=date(2023, 2, 18),
        ),
        Task(
            user_id=1,
            title="Go for a run",
            description="Jog for 30 minutes in the park.",
            due_date=date(2023, 2, 23),
            created_at=date(2023, 2, 17),
            updated_at=date(2023, 2, 17),
        ),
        Task(
            user_id=2,
            title="Clean the house",
            description="Vacuum the carpets and dust the shelves.",
            due_date=date(2023, 3, 1),
            created_at=date(2023, 2, 16),
            updated_at=date(2023, 2, 16),
        ),
    ]

    for task in tasks:
        db.session.add(task)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tasks")
        
    db.session.commit()