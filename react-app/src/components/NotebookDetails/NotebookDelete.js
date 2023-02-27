import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteNotebookThunk } from "../../store/notebook";

const DeleteNotebookModal = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { closeModal } = useModal();
	const [errors, setErrors] = useState([]);
	const notebook = useSelector((state) => state.notebooks.singleNotebook);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);

		dispatch(deleteNotebookThunk(notebook.id))
			.then(() => history.push("/notebooks"))
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
	};

	return (
		<div className="delete-wrapper">
			<div className="x-button">
				<div className="exit" onClick={closeModal}>
					{/* x */}
					<i className="fa-solid fa-xmark" />
				</div>
			</div>

			<div className="delete-pop-up">
				<h2>Delete this notebook?</h2>
				<p>(This is permanent and cannot be undone. All notes within the notebook will be deleted as well.)</p>
				<form onSubmit={handleSubmit}>
					<button type="submit">Confirm Delete</button>
                    {/* check plantsy button design */}
				</form>
			</div>
		</div>
	);
};

export default DeleteNotebookModal;
