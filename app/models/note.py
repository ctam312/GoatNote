from .db import db, environment, SCHEMA, add_prefix_for_prod

class Note(db.Model):
    __tablename__ = "notes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    notebook_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("notebooks.id")), nullable=True)
    title = db.Column(db.String, nullable=True)
    content = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.TIMESTAMP(timezone=True), nullable=True)
    updated_at = db.Column(db.TIMESTAMP(timezone=True), nullable=True)

    user = db.relationship("User", back_populates="notes")
    notebook = db.relationship("Notebook", back_populates="notes")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'notebook_id': self.notebook_id,
            'title': self.title,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }