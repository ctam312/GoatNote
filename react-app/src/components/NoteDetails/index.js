import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editNoteThunk, getNoteDetailsThunk } from "../../store/note";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeletePlantModal from "../DeleteNote";
import { getNotebooksThunk } from "../../store/notebook";
import "./NoteDetails.css";

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
		<div className="note-details-container">
			<div className="note-details-inner-container">
				<div className="note-part">
					<input 
						value={title}
						className = "note-detail-title"
						onChange={handleTitleChange}
						placeholder="New Note"
						onBlur={(e) => {
							if (e.target.value.length >= 15) {
								alert("Title should be no more than 15 characters");
							}
						}}
						maxLength="15"
						minLength="1"
						required
					/>
				</div>
				<h3>
					Add to Notebook:{" "}
					<select className="notebook-selector" value={notebook_id} onChange={handleNotebookChange}>
						<option value={0}>No Notebook</option>
						{Object.values(notebooks).map((notebook) => (
							<option key={notebook.id} value={notebook.id}>
								{notebook.title}
							</option>
						))}
					</select>
				</h3>

				<div className="note-part">
					<textarea
						value={content}
						onChange={handleContentChange}
						placeholder="Click to Type"
					/>
				</div>
				<div className="modal-button">
					<OpenModalButton
						className="delete-spot"
						modalComponent={<DeletePlantModal />}
						buttonText="Delete Note"
					/>
				</div>
			</div>
		</div>
	);
}

export default NoteDetails;
