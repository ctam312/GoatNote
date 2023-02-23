import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllNotesThunk } from "../../store/note";

const NoteList = () => {
	const dispatch = useDispatch();
	const allNotes = useSelector((state) => state.notes.allNotes);
    console.log(allNotes)

	useEffect(() => {
		dispatch(getAllNotesThunk());
	}, [dispatch]);

	return (
		<div>
			<h1>Notes</h1>
			<ul>
				{Object.values(allNotes).map((note) => (
					<li key={note.id}>
						<Link to={`/notes/${note.id}`}>{note.title}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default NoteList;
