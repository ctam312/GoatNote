import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getNotebooksThunk, updateNotebookThunk } from "../../store/notebook";
import CreateNotebookModal from "../CreateNotebookForm";
import OpenModalButton from "../OpenModalButton";

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
		dispatch(updateNotebookThunk({id:notebookId, title: newTitle }))
        .then(() => dispatch(getNotebooksThunk()))
		setEditId(null);
	};

	return (
		<div>
			<h1>Notebooks</h1>
            <OpenModalButton
				className="delete-spot"
				modalComponent={<CreateNotebookModal />}
				buttonText="Create Notebook"
			/>
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Created</th>
						<th>Last Updated</th>
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
											required
										/>
										<button type="submit">Submit</button>
									</form>
								) : (
									<Link to={`/notebooks/${notebook.id}`}>{notebook.title}</Link>
								)}
							</td>
							<td>{new Date(notebook.created_at).toLocaleDateString()}</td>
							<td>{notebook.updated_at ? new Date(notebook.updated_at).toLocaleDateString() : new Date(notebook.created_at).toLocaleDateString()}</td>
							<td>
								{editId === notebook.id ? (
									""
								) : (
									<button onClick={() => handleEdit(notebook.id)}>Edit</button>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default NotebookList;
