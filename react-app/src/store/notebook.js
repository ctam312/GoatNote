const LOAD_ALL_NOTEBOOKS = "notebooks/LOAD_ALL_NOTEBOOKS";
const LOAD_NOTEBOOK = "notebooks/LOAD_NOTEBOOK";
const CREATE_NOTEBOOK = "notebooks/CREATE_NOTEBOOK";
const UPDATE_NOTEBOOK = "notebooks/UPDATE_NOTEBOOK";
const DELETE_NOTEBOOK = "notebooks/DELETE_NOTEBOOK";

// ACTION CREATORS
export const loadAllNotebooks = (notebooks) => ({
	type: LOAD_ALL_NOTEBOOKS,
	payload: notebooks,
});

export const loadNotebook = (notebook) => ({
	type: LOAD_NOTEBOOK,
	payload: notebook,
});

export const createNotebook = (notebook) => ({
	type: CREATE_NOTEBOOK,
	payload: notebook,
});

export const updateNotebook = (notebook) => ({
	type: UPDATE_NOTEBOOK,
	payload: notebook,
});

export const deleteNotebook = (notebookId) => ({
	type: DELETE_NOTEBOOK,
	payload: notebookId,
});

// THUNKS

export const getNotebooksThunk = () => async (dispatch) => {
	const res = await fetch("/api/notebooks/");
	if (res.ok) {
		const data = await res.json();
		dispatch(loadAllNotebooks(data));
		return data;
	}
	return res;
};

export const getNotebookDetailsThunk = (notebookId) => async (dispatch) => {
	const res = await fetch(`/api/notebooks/${notebookId}`);
	if (res.ok) {
		const data = await res.json();
		dispatch(loadNotebook(data));
		return data;
	}
	return res;
};

export const createNotebookThunk = (notebook) => async (dispatch) => {
	const res = await fetch(`/api/notebooks/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(notebook),
	});
	if (res.ok) {
		const data = await res.json();
		dispatch(createNotebook(data));
		return data;
	}
	return res;
};

export const updateNotebookThunk = (notebook) => async (dispatch) => {
    console.log(notebook)
	const res = await fetch(`/api/notebooks/${notebook.id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(notebook),
	});
	if (res.ok) {
		const data = await res.json();
		dispatch(updateNotebook(data));
		return data;
	}
	return res;
};

export const deleteNotebookThunk = (notebookId) => async (dispatch) => {
	const res = await fetch(`/api/notebooks/${notebookId}`, {
		method: "DELETE",
	});
	if (res.ok) {
		const data = await res.json();
		dispatch(deleteNotebook(notebookId));
		return data;
	}
	return res;
};

// REDUCER
const initialState = {
	allNotebooks: {},
	singleNotebook: {},
};

export default function notebookReducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_ALL_NOTEBOOKS: {
            console.log(action.payload)
			const newState = { allNotebooks: {}, singleNotebook: {} };
			action.payload.notebooks.forEach((notebook) => {
				newState.allNotebooks[notebook.id] = notebook;
			});
			return newState;
		}

		case LOAD_NOTEBOOK: {
			const newState = { ...state, singleNotebook: {} };
			newState.singleNotebook = action.payload;
			return newState;
		}

		case CREATE_NOTEBOOK: {
			const newState = { ...state, singleNotebook: {} };
			newState.allNotebooks[action.payload.id] = action.payload;
			return newState;
		}

		case UPDATE_NOTEBOOK: {
			const newState = { ...state, singleNotebook: {} };
			newState.allNotebooks[action.payload.id] = action.payload;
			return newState;
		}

		case DELETE_NOTEBOOK: {
			const newState = { ...state, singleNotebook: {} };
			delete newState.allNotebooks[action.payload];
			return newState;
		}

		default:
			return state;
	}
}
