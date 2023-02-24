from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, HiddenField, IntegerField
from wtforms.validators import DataRequired, Length, Optional

class NoteForm(FlaskForm):
    title = StringField('Title', validators=[Length(max=50)])
    content = TextAreaField('Content', validators=[])
    notebook_id = IntegerField('Notebook ID', validators=[Optional()])
