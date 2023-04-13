from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import Length

class ScratchpadForm(FlaskForm):
    content = TextAreaField('content', validators=[ Length(min=0, max=1000)])