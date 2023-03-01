import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getNotebooksThunk, updateNotebookThunk } from "../../store/notebook";
import CreateNotebookModal from "../CreateNotebookForm";
import OpenModalButton from "../OpenModalButton";
import "./NoteBookList.css";

const NotebookList = () => {
	const dispatch = useDispatch();
	const notebooks = useSelector((state) => state.notebooks.allNotebooks);

	useEffect(() => {
		dispatch(getNotebooksThunk());
	}, [dispatch]);

	const [editId, setEditId] = useState(null);
	const [newTitle, setNewTitle] = useState("");

	const handleEdit = (notebookId) => {
		const notebook = Object.values(notebooks).find((n) => n.id === notebookId);
		setEditId(notebookId);
		setNewTitle(notebook.title);
	};

	const handleSubmit = (notebookId, newTitle) => {
		dispatch(updateNotebookThunk({ id: notebookId, title: newTitle })).then(
			() => dispatch(getNotebooksThunk())
		);
		setEditId(null);
	};

	return (
		<div className="notebook-container">
			<div className="notebook-container-inner">
				<h1 className="notebook-title">
					📓 Notebooks{" "}
				</h1>
					<div className="modal-button">
					<OpenModalButton
						className="create-plant-button"
						modalComponent={<CreateNotebookModal />}
						buttonText="Create New Notebook"
					/>
					</div>
				<div className="inner-notebook-container">
				{Object.keys(notebooks).length === 0 ? (
					<p>You have no notebooks. Click "Create New Notebook" above.</p>
				) : (
					<div className="notebook-table-container">
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
						<tbody>
							{Object.values(notebooks).map((notebook) => (
								<tr key={notebook.id}>
									<td>
										{editId === notebook.id ? (
											<form
												onSubmit={(e) => {
													e.preventDefault();
													handleSubmit(notebook.id, newTitle);
												}}
											>
												<input
													type="text"
													value={newTitle}
													onChange={(e) => setNewTitle(e.target.value)}
													minLength="1"
													required
													onBlur={(e) => {
														if (e.target.value.length > 20) {
															alert(
																"Title should be no more than 20 characters"
															);
														}
													}}
												/>
												<button className="wiggle-button-2" type="submit">
													Submit
												</button>
											</form>
										) : (
											<Link to={`/notebooks/${notebook.id}`}>
												{notebook.title}
											</Link>
										)}
									</td>
									<td className="not-title">
										{" "}
										{new Date(notebook.created_at).toLocaleDateString()}
									</td>
									<td className="not-title">
										{notebook.updated_at
											? new Date(notebook.updated_at).toLocaleDateString()
											: new Date(notebook.created_at).toLocaleDateString()}
									</td>
									<td className="not-title">
										{editId === notebook.id ? (
											""
										) : (
											<button
												className="wiggle-button"
												onClick={() => handleEdit(notebook.id)}
											>
												<span>Edit Title</span>
											</button>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
					</div>
				)}
				</div>
			</div>
		</div>
	);
};

export default NotebookList;
