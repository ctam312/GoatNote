import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getAllNotesThunk } from "../../store/note";
import "./NoteList.css"

const NoteList = () => {
	const dispatch = useDispatch();
	const allNotes = useSelector((state) => state.notes.allNotes);
	const history = useHistory();
    console.log("checkout all these NOTES -->", allNotes)

	useEffect(() => {
		dispatch(getAllNotesThunk());
	}, [dispatch]);

	return (
		<div className="notes-component">
			<h1>Notes</h1>
			<div className="allnotes-container">
				{Object.values(allNotes).map((note) => (
					<div className="note-detail-container" key={note.id} onClick={() => history.push(`/notes/${note.id}`)}>
						<div className="notes-info" id="note-title">
						{note.title}
						</div>
						<div className="notes-info">
						Created on: {note.created_at}
						</div>
						<div className="notes-info">
							Last Updated: {note.updated_at}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default NoteList;
