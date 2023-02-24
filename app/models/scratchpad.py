from .db import db, environment, SCHEMA, add_prefix_for_prod

class Scratchpad(db.Model):
    __tablename__ = "scratchpads"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    content = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.TIMESTAMP(timezone=True), nullable=False)
    updated_at = db.Column(db.TIMESTAMP(timezone=True), nullable=False)

    user = db.relationship("User", back_populates="scratchpads")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'content': self.content,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
        }