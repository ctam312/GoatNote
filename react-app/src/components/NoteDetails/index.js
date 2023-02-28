import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editNoteThunk, getNoteDetailsThunk } from "../../store/note";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeletePlantModal from "../DeleteNote";
import { getNotebooksThunk } from "../../store/notebook";
import "./NoteDetails.css";
import { throttle } from "lodash";

function NoteDetails() {
	const { noteId } = useParams();
	const dispatch = useDispatch();
	const note = useSelector((state) => state.notes.singleNote);
	const notebooks = useSelector((state) => state.notebooks.allNotebooks);
	console.log("NOTEBOOKS HERE", notebooks);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [notebook_id, setNotebook_id] = useState("");

	useEffect(() => {
		dispatch(getNoteDetailsThunk(noteId));
		dispatch(getNotebooksThunk());
	}, [dispatch, noteId]);

	useEffect(() => {
		setTitle(note?.title || "");
		setContent(note?.content || "");
		setNotebook_id(note?.notebook_id || "");
	}, [note]);

	// Define throttled versions of the event handlers using Lodash's throttle function
	const handleTitleChangeThrottled = throttle((value) => {
		setTitle(value);
		const note = {
			content,
			title: value,
			notebook_id,
		};
		dispatch(editNoteThunk(noteId, note));
	}, 500);

	const handleContentChangeThrottled = throttle((value) => {
		setContent(value);
		const note = {
			content: value,
			title,
			notebook_id,
		};
		dispatch(editNoteThunk(noteId, note));
	}, 500);

	const handleNotebookChangeThrottled = throttle((value) => {
		setNotebook_id(value);
		const note = {
			content,
			title,
			notebook_id: value,
		};
		dispatch(editNoteThunk(noteId, note));
	}, 500);

	return (
		<div className="full-container">
			Title:
			<div className="note-part">
				<input
					value={title}
					onChange={(e) => handleTitleChangeThrottled(e.target.value)}
					placeholder="New Note"
				/>
			</div>
			Content:
			<div className="note-part">
				<textarea
					value={content}
					onChange={(e) => handleContentChangeThrottled(e.target.value)}
					placeholder="Click to Type"
				/>
			</div>
			Choose Which Notebook to place in:
			<div className="note-part">
				<select
					value={notebook_id}
					onChange={(e) => handleNotebookChangeThrottled(e.target.value)}
				>
					{Object.values(notebooks).map((notebook) => (
						<option key={notebook.id} value={notebook.id}>
							{notebook.title}
						</option>
					))}
				</select>
			</div>
			<OpenModalButton
				className="delete-spot"
				modalComponent={<DeletePlantModal />}
				buttonText="Delete Note"
			/>
		</div>
	);
}

export default NoteDetails;
