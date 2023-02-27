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
	const [notebook_id, setNotebook_id] = useState("");

	useEffect(() => {
		dispatch(getNoteDetailsThunk(noteId));
	}, [dispatch, noteId]);

	useEffect(() => {
		setTitle(note?.title || "");
		setContent(note?.content || "");
		setNotebook_id(note?.notebook_id || "")
	}, [note]);

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
		let note = {}
		if (note.notebook_id){
			note = {content, title: event.target.value, notebook_id:note.notebook_id}
		} else {
			note = {content, title: event.target.value, notebook_id}
		}
		dispatch(
			editNoteThunk(noteId, note)
		);
	};

	const handleContentChange = (event) => {
		setContent(event.target.value);
		let note = {}
		if (note.notebook_id){
			note = {content: event.target.value, title, notebook_id:note.notebook_id}
		} else {
			note = {content: event.target.value, title, notebook_id}
		}
		dispatch(
			editNoteThunk(noteId, note)
		);
	};

	const handleNotebookChange = (event) => {
		setNotebook_id(event.target.value);
		let note = {}
		if (note.notebook_id){
			note = {content, title, notebook_id:event.target.value}
		} else {
			note = {content, title, notebook_id:event.target.value}
		}
		dispatch(
			editNoteThunk(noteId, note, notebook_id)
		);
	};

	return (
		<div>
			<input value={title} onChange={handleTitleChange} placeholder="New Note" />
			<textarea value={content} onChange={handleContentChange} placeholder="Click to Type" />
			<input value={notebook_id} onChange={handleNotebookChange}/>
			<OpenModalButton
				className="delete-spot"
				modalComponent={<DeletePlantModal />}
				buttonText="Delete Note"
			/>
		</div>
	);
}

export default NoteDetails;
