// constants
const LOAD_ALL_NOTES = "notes/LOAD_ALL_NOTES";
const LOAD_NOTE = "notes/LOAD_NOTE";
const CREATE_NOTE = "notes/CREATE_NOTE";
const EDIT_NOTE = "notes/EDIT_NOTE";
const DELETE_NOTE = "notes/DELETE_NOTE";

// action creators
export const loadAllNotes = (notes) => ({
	type: LOAD_ALL_NOTES,
	notes,
});

export const loadNote = (note) => ({
	type: LOAD_NOTE,
	note,
});

export const createNote = (note) => ({
	type: CREATE_NOTE,
	note,
});

export const editNote = (note) => ({
	type: EDIT_NOTE,
	note,
});

export const deleteNote = (noteId) => ({
	type: DELETE_NOTE,
	noteId,
});

// thunks
export const getAllNotesThunk = () => async (dispatch) => {
	const res = await fetch("/api/notes/");
	if (res.ok) {
		const notes = await res.json();
		dispatch(loadAllNotes(notes));
		return notes;
	}
	return res;
};

export const getNoteDetailsThunk = (noteId) => async (dispatch) => {
    const res = await fetch(`/api/notes/${noteId}`);
	if (res.ok) {
		const note = await res.json();
		dispatch(loadNote(note));
		return note;
	}
	return res;
};

export const createNoteThunk = (note) => async (dispatch) => {
    const res = await fetch("/api/notes/", {
        method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(note),
	});
	if (res.ok) {
		const newNote = await res.json();
		dispatch(createNote(newNote));
		return newNote;
	}
	return res;
};

export const editNoteThunk = (noteId, note) => async (dispatch) => {
    const res = await fetch(`/api/notes/${noteId}`, {
        method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(note),
	});
	if (res.ok) {
		const editedNote = await res.json();
		dispatch(editNote(editedNote));
		return editedNote;
	}
	return res;
};

export const deleteNoteThunk = (noteId) => async (dispatch) => {
	const res = await fetch(`/api/notes/${noteId}`, {
		method: "DELETE",
	});
	if (res.ok) {
		dispatch(deleteNote(noteId));
		return noteId;
	}
	return res;
};

// reducers
const initialState = {
	allNotes: {},
	singleNote: {},
	error: null,
};

export default function notesReducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_ALL_NOTES: {
			const newState = { allNotes: {}, singleNote: {}, error: null };
			action.notes.notes.forEach((note) => {
				newState.allNotes[note.id] = note;
			});
			return newState;
		}
		case LOAD_NOTE: {
			const newState = { ...state, singleNote: {}, error: null };
			newState.singleNote = action.note;
			return newState;
		}
		case CREATE_NOTE: {
			const newState = { ...state, singleNote: {}, error: null };
			newState.allNotes[action.note.id] = action.note;
			return newState;
		}
		case EDIT_NOTE: {
			const newState = { ...state, singleNote: {}, error: null };
			newState.allNotes[action.note.id] = action.note;
			newState.singleNote = action.note;
			return newState;
		}
		case DELETE_NOTE: {
			const newState = { ...state, singleNote: {}, error: null };
			delete newState.allNotes[action.noteId];
			return newState;
		}
		default:
			return state;
	}
}
