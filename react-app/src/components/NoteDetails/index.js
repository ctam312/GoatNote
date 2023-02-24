import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editNoteThunk, getNoteDetailsThunk } from "../../store/note";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeletePlantModal from "../DeleteNote";

function NoteDetails() {
	const { noteId } = useParams();
	const dispatch = useDispatch();
	const note = useSelector((state) => state.notes.singleNote);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	useEffect(() => {
		dispatch(getNoteDetailsThunk(noteId));
	}, [dispatch, noteId]);

	useEffect(() => {
		setTitle(note?.title || "");
		setContent(note?.content || "");
	}, [note]);

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
		dispatch(
			editNoteThunk(noteId, event.target.value, content, note.notebook_id)
		);
	};

	const handleContentChange = (event) => {
		setContent(event.target.value);
		dispatch(
			editNoteThunk(noteId, title, event.target.value, note.notebook_id)
		);
	};

	return (
		<div>
			<input value={title} onChange={handleTitleChange} placeholder="New Note" />
			<textarea value={content} onChange={handleContentChange} placeholder="Click to Type" />
			<OpenModalButton
				className="delete-spot"
				modalComponent={<DeletePlantModal />}
				buttonText="Delete Plant"
			/>
		</div>
	);
}

export default NoteDetails;
