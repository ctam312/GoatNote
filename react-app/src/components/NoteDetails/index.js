import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editNoteThunk, getNoteDetailsThunk } from "../../store/note";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeletePlantModal from "../DeleteNote";
import { getNotebooksThunk } from "../../store/notebook";

function NoteDetails() {
	const { noteId } = useParams();
	const dispatch = useDispatch();
	const note = useSelector((state) => state.notes.singleNote);
	const notebooks = useSelector((state) => state.notebooks.allNotebooks);
	console.log("NOTEBOOKS HERE", notebooks)
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [notebook_id, setNotebook_id] = useState("");

	useEffect(() => {
		dispatch(getNoteDetailsThunk(noteId));
		dispatch(getNotebooksThunk())
	}, [dispatch, noteId]);

	useEffect(() => {
		setTitle(note?.title || "");
		setContent(note?.content || "");
		setNotebook_id(note?.notebook_id || "");
	}, [note]);

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
		const note = {
			content,
			title: event.target.value,
			notebook_id,
		};
		dispatch(editNoteThunk(noteId, note));
	};

	const handleContentChange = (event) => {
		setContent(event.target.value);
		const note = {
			content: event.target.value,
			title,
			notebook_id,
		};
		dispatch(editNoteThunk(noteId, note));
	};

	const handleNotebookChange = (event) => {
		setNotebook_id(event.target.value);
		const note = {
			content,
			title,
			notebook_id: event.target.value,
		};
		dispatch(editNoteThunk(noteId, note));
	};

	return (
		<div>
			<input
				value={title}
				onChange={handleTitleChange}
				placeholder="New Note"
			/>
			<textarea
				value={content}
				onChange={handleContentChange}
				placeholder="Click to Type"
			/>
			<select value={notebook_id} onChange={handleNotebookChange}>
				{Object.values(notebooks).map((notebook) => (
					<option key={notebook.id} value={notebook.id}>
						{notebook.title}
					</option>
				))}
			</select>
			<OpenModalButton
				className="delete-spot"
				modalComponent={<DeletePlantModal />}
				buttonText="Delete Note"
			/>
		</div>
	);
}

export default NoteDetails;
