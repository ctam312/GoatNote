from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import Length, Optional

class NoteForm(FlaskForm):
    title = StringField('Title', validators=[Length(max=50)])
    content = TextAreaField('Content', validators=[])
    notebook_id = IntegerField('Notebook ID', validators=[Optional()])
