import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotebookDetailsThunk } from "../../store/notebook";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./NotebookDetails.css";
import OpenModalButton from "../OpenModalButton";
import DeleteNotebookModal from "./NotebookDelete";

export default function NotebookDetails() {
	const singleNotebook = useSelector((state) => state.notebooks.singleNotebook);
	const singleNotes = useSelector(
		(state) => state.notebooks.singleNotebook.notes
	);
	const dispatch = useDispatch();
	const history = useHistory();
	const { notebookId } = useParams();

	useEffect(() => {
		dispatch(getNotebookDetailsThunk(notebookId));
	}, [dispatch, notebookId]);

	return (
		<div className="full-notebook-details">
			<div className="notebook-details-container">
				<div className="notebook-details-header">
					<h1 className="notebook-details-title">
						Inside Notebook: {singleNotebook.title}{" "}
					</h1>
					<div className="modal-button">
						<OpenModalButton
							className="delete-notebook-button"
							modalComponent={<DeleteNotebookModal />}
							buttonText="Delete Notebook"
						/>
					</div>
				</div>

				{singleNotes && singleNotes.length > 0 ? (
					<div className="notebook-details-table-container">
						<table className="notebook-table">
							<thead>
								<tr>
									<th id="table-not-title">Title:</th>
									<th id="table-not-title" className="not-title">
										Created:
									</th>
									<th id="table-not-title" className="not-title">
										Updated:
									</th>
								</tr>
							</thead>
							<tbody className="each-note-notebook">
								{singleNotes.map((note) => (
									<tr key={note.id}>
										<td id="updated-note-notebook">
											<Link to={`/notes/${note.id}`}>{note.title}</Link>
										</td>
										<td className="not-title" id="updated-note-notebook">
											{new Date(note.created_at).toLocaleDateString()}
										</td>
										<td className="not-title" id="updated-note-notebook">
											{note.updated_at
												? new Date(note.updated_at).toLocaleDateString()
												: new Date(note.created_at).toLocaleDateString()}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<p>There are no notes within this notebook. Please click "Create Note" and select this notebook.</p>
				)}
			</div>
		</div>
	);
}
