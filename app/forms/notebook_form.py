from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import Length

class NotebookForm(FlaskForm):
    title = StringField('Title', validators=[Length(min=1, max=50)])
