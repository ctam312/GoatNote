from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.forms import TaskForm
from app.models import Task, db

tasks_routes = Blueprint('tasks', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@tasks_routes.route('/')
@login_required
def get_all_notes():
    tasks = Task.query.filter(Task.user_id == current_user.id).all()
    return {"tasks": [task.to_dict() for task in tasks]}

@tasks_routes.route('/<int:taskId>')
@login_required
def get_task(taskId):
    task = Task.query.get_or_404(taskId)
    if task.user_id != current_user.id:
        return {'message': 'Unauthorized'}, 403
    return task.to_dict()

@tasks_routes.route('/', methods=['POST'])
@login_required
def create_task():
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        task = Task(
            user_id=current_user.id,
            title=form.title.data,
            description=form.description.data,
            due_date=form.due_date.data,
            completed=form.completed.data
        )
        db.session.add(task)
        db.session.commit()
        return task.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@tasks_routes.route('/<int:taskId>', methods=['PUT'])
@login_required
def update_task(taskId):
    task = Task.query.get_or_404(taskId)
    if task.user_id != current_user.id:
        return {'message': 'Unauthorized'}, 403
    form = TaskForm()
    if form.validate_on_submit():
        task.title = form.title.data
        task.description = form.description.data
        task.due_date = form.due_date.data
        task.completed = form.completed.data
        db.session.commit()
        return task.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400



@tasks_routes.route('/<int:taskId>', methods=['DELETE'])
@login_required
def delete_task(taskId):
    task = Task.query.get_or_404(taskId)
    if task.user_id != current_user.id:
        return {'message': 'Unauthorized'}, 403
    db.session.delete(task)
    db.session.commit()
    return {'message': 'Task deleted'}
