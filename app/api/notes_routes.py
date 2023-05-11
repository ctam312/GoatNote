from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Note
from app.forms.note_form import NoteForm

note_routes = Blueprint('notes', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@note_routes.route('/')
@login_required
def get_all_notes():
    notes = Note.query.filter(Note.user_id == current_user.id).all()
    return {"notes": [note.to_dict() for note in notes]}

@note_routes.route('/<int:noteId>')
@login_required
def get_note(noteId):
    note = Note.query.get_or_404(noteId)
    if note.user_id != current_user.id:
        return {'message': 'Unauthorized'}, 403
    return note.to_dict()

@note_routes.route('/', methods=['POST'])
@login_required
def create_note():
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        note = Note(
            title=form.title.data,
            content=form.content.data,
            user_id=current_user.id,
        )
        db.session.add(note)
        db.session.commit()
        return note.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@note_routes.route('/<int:noteId>', methods=['PUT'])
@login_required
def update_note(noteId):
    note = Note.query.get_or_404(noteId)
    if note.user_id != current_user.id:
        return {'message': 'Unauthorized'}, 403
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        note.title = form.title.data
        note.content = form.content.data
        note.notebook_id = form.notebook_id.data
        db.session.commit()
        return note.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@note_routes.route('/<int:noteId>', methods=['DELETE'])
@login_required
def delete_note(noteId):
    note = Note.query.get_or_404(noteId)
    if note.user_id != current_user.id:
        return {'message': 'Unauthorized'}, 403
    db.session.delete(note)
    db.session.commit()
    return {'message': 'Note deleted'}
