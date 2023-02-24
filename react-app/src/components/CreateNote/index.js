import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNoteThunk } from "../../store/note";
import { useHistory } from "react-router-dom";

const CreateNoteButton = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [note, setNote] = useState({
		title: "New Note",
		content: "",
	});

	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const newNote = await dispatch(createNoteThunk(note));
		setIsLoading(false);
		history.push(`/notes/${newNote.id}`);
	};

	return (
		<form onSubmit={handleSubmit}>
			<button type="submit" disabled={isLoading}>
				{isLoading ? "Loading..." : "Create Note"}
			</button>
		</form>
	);
};

export default CreateNoteButton;

//is there a way I can delay the loading for when I create it, so it wont break on render?
