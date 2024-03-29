import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getAllNotesThunk } from "../../store/note";
import "./NoteList.css";
import ScratchPad from "../ScratchPad";
import NoteTask from "../TaskList";

const NoteList = () => {
	const dispatch = useDispatch();
	const allNotes = useSelector((state) => state.notes.allNotes);
	const user = useSelector((state) => state.session.user);
	const history = useHistory();

	useEffect(() => {
		dispatch(getAllNotesThunk());
	}, [dispatch]);

	return (
		<div className="peer-review-div">
			<div className="notes-component">
				<h1 className="welcome-header-top">Welcome back, {user?.username}!</h1>
				<div className="all-components">
					<div className="check-compo">
						<div className="testing">
							<div className="notes-list-inner-cont">
								<h2>📝 Notes:</h2>
								<div className="allnotes-container">
									{Object.values(allNotes).length ? (
										Object.values(allNotes).map((note) => (
											<div
												className="note-detail-container"
												key={note.id}
												onClick={() => history.push(`/notes/${note.id}`)}
											>
												<div className="notes-info" id="note-title">
													{note.title}
												</div>
												<div className="notes-info">
													Created on:{" "}
													{new Date(note.created_at).toLocaleDateString()}
												</div>
												<div className="notes-info">
													Last Updated:{" "}
													{note.updated_at
														? new Date(note.updated_at).toLocaleDateString()
														: new Date(note.created_at).toLocaleDateString()}
												</div>
											</div>
										))
									) : (
										<h3 className="no-notes-message">
											You have no notes. Click "Create Note" on the left to make
											some notes!
										</h3>
									)}
								</div>
							</div>
						</div>
						<div className="sidestack">
							<div className="scratchDiv">
							<h2>📝 ScratchPad:</h2>
							<ScratchPad />
							</div>
							<div className="taskDiv">
								<NoteTask />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NoteList;
