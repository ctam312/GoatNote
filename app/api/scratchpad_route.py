from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.forms import ScratchpadForm
from app.models import Scratchpad, db

scratchpad_routes = Blueprint('scratchpads', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@scratchpad_routes.route('/', methods=['GET'])
@login_required
def get_scratchpad():
    """
    Get scratchpad
    """
    scratchpad = Scratchpad.query.filter_by(user_id=current_user.id).first()
    if scratchpad:
        return jsonify({
            'scratchpad': {
                'id': scratchpad.id,
                'content': scratchpad.content,
                'created_at': scratchpad.created_at,
                'updated_at': scratchpad.updated_at,
            }})
    return {'errors': 'No scratchpad found'}, 404


@scratchpad_routes.route('/', methods=['PUT'])
@login_required
def update_scratchpad():
    """
    Update scratchpad
    """
    form = ScratchpadForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data['content'])
    if form.validate_on_submit():
        scratchpad = Scratchpad.query.filter_by(user_id=current_user.id).first()
        scratchpad.content = form.data['content']
        db.session.add(scratchpad)
        db.session.commit()
        return scratchpad.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401