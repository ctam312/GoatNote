import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNoteThunk } from "../../store/note";
import { useHistory } from "react-router-dom";

const CreateNoteButton = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [note, setNote] = useState({ title: "New Note", content: "Click to Type" });

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newNote = await dispatch(createNoteThunk(note));
		history.push(`/notes/${newNote.id}`);
	};

	return (
		<form onSubmit={handleSubmit}>
			<button type="submit">Create Note</button>
		</form>
	);
};

export default CreateNoteButton;
