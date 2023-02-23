from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length

class NoteForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(max=50)])
    content = TextAreaField('Content', validators=[DataRequired()])
    notebook_id = IntegerField('Notebook ID', validators=[DataRequired()])
