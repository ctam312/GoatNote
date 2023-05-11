// constants
const LOAD_ALL_TASKS = "Tasks/LOAD_ALL_TASKS";
const LOAD_TASK = "Tasks/LOAD_TASK";
const CREATE_TASK = "Tasks/CREATE_TASK";
const EDIT_TASK = "Tasks/EDIT_TASK";
const DELETE_TASK = "Tasks/DELETE_TASK";

// action creators
export const loadAllTasks = (tasks) => ({
	type: LOAD_ALL_TASKS,
	tasks,
});

export const loadTask = (task) => ({
	type: LOAD_TASK,
	task,
});

export const createTask = (task) => ({
	type: CREATE_TASK,
	task,
});

export const editTask = (task) => ({
	type: EDIT_TASK,
	task,
});

export const deleteTask = (taskId) => ({
	type: DELETE_TASK,
	taskId,
});

// thunks
export const getAllTasksThunk = () => async (dispatch) => {
	const res = await fetch("/api/tasks/");
	if (res.ok) {
		const tasks = await res.json();
		dispatch(loadAllTasks(tasks));
		return tasks;
	}
	return res;
};

export const getTaskDetailsThunk = (taskId) => async (dispatch) => {
    const res = await fetch(`/api/tasks/${taskId}`);
	if (res.ok) {
		const task = await res.json();
		dispatch(loadTask(task));
		return task;
	}
	return res;
};

export const createTaskThunk = (task) => async (dispatch) => {
    const res = await fetch("/api/tasks/", {
        method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(task),
	});
	if (res.ok) {
		const newTask = await res.json();
		dispatch(createTask(newTask));
		return newTask;
	}
	return res;
};

export const editTaskThunk = (taskId, task) => async (dispatch) => {
    const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(task),
	});
	if (res.ok) {
		const editedTask = await res.json();
		dispatch(editTask(editedTask));
		return editedTask;
	}
	return res;
};

export const deleteTaskThunk = (taskId) => async (dispatch) => {
	const res = await fetch(`/api/tasks/${taskId}`, {
		method: "DELETE",
	});
	if (res.ok) {
		dispatch(deleteTask(taskId));
		return taskId;
	}
	return res;
};

// reducers
const initialState = {
	allTasks: {},
	singleTask: {},
	error: null,
};

export default function TasksReducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_ALL_TASKS: {
			const newState = { allTasks: {}, singleTask: {}, error: null };
			action.tasks.tasks.forEach((task) => {
				newState.allTasks[task.id] = task;
			});
			return newState;
		}
		case LOAD_TASK: {
			const newState = { ...state, singleTask: {}, error: null };
			newState.singleTask = action.task;
			return newState;
		}
		case CREATE_TASK: {
			const newState = { ...state, singleTask: {}, error: null };
			newState.allTasks[action.task.id] = action.task;
			return newState;
		}
		case EDIT_TASK: {
			const newState = { ...state, singleTask: {}, error: null };
			newState.allTasks[action.task.id] = action.task;
			newState.singleTask = action.task;
			return newState;
		}
		case DELETE_TASK: {
			const newState = { ...state, singleTask: {}, error: null };
			delete newState.allTasks[action.taskId];
			return newState;
		}
		default:
			return state;
	}
}
