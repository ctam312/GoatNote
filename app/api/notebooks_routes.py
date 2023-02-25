from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Notebook
from app.forms.notebook_form import NotebookForm

notebook_routes = Blueprint('notebooks', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@notebook_routes.route('/')
@login_required
def get_all_notebooks():
    notebooks = Notebook.query.filter_by(user_id=current_user.id).all()
    return {"notebooks": [notebook.to_dict() for notebook in notebooks]}

@notebook_routes.route('/<int:notebook_id>')
@login_required
def get_notebook(notebook_id):
    notebook = Notebook.query.get_or_404(notebook_id)
    if notebook.user_id != current_user.id:
        return {'message': 'Unauthorized'}, 403
    return notebook.to_dict()

@notebook_routes.route('/', methods=['POST'])
@login_required
def create_notebook():
    form = NotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        notebook = Notebook(
            title=form.title.data,
            user_id=current_user.id,
        )
        db.session.add(notebook)
        db.session.commit()
        return notebook.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@notebook_routes.route('/<int:notebook_id>', methods=['PUT'])
@login_required
def update_notebook(notebook_id):
    notebook = Notebook.query.get_or_404(notebook_id)
    if notebook.user_id != current_user.id:
        return {'message': 'Unauthorized'}, 403
    form = NotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        notebook.title = form.title.data
        db.session.commit()
        return notebook.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@notebook_routes.route('/<int:notebook_id>', methods=['DELETE'])
@login_required
def delete_notebook(notebook_id):
    notebook = Notebook.query.get_or_404(notebook_id)
    if notebook.user_id != current_user.id:
        return {'message': 'Unauthorized'}, 403
    db.session.delete(notebook)
    db.session.commit()
    return {'message': 'Notebook deleted'}
