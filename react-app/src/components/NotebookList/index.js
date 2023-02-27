import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getNotebooksThunk } from "../../store/notebook";

const NotebookList = () => {
	const dispatch = useDispatch();
	const notebooks = useSelector((state) => state.notebooks.allNotebooks);


	useEffect(() => {
		dispatch(getNotebooksThunk());
	}, [dispatch]);

	return (
        <div>
            <h1>Notebooks</h1>
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
							<Link to={`/notebooks/${notebook.id}`}>{notebook.title}</Link>
						</td>
						<td>{new Date(notebook.created_at).toLocaleDateString()}</td>
						<td>{new Date(notebook.updated_at).toLocaleDateString()}</td>
                        <td>Edit</td>
                        <td>Delete</td>
					</tr>
				))}
			</tbody>
		</table>
        </div>
	);
};

export default NotebookList;
