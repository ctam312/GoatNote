from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DateField, BooleanField
from wtforms.validators import Length, DataRequired

class TaskForm(FlaskForm):
    title = StringField('Title', validators=[Length(min=1, max=50)])
    description = TextAreaField('Description', validators=[DataRequired()])
    due_date = DateField('Due Date', validators=[DataRequired()])
    completed = BooleanField('Completed', validators=[])
