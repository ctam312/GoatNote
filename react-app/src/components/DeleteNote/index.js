import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteNoteThunk } from "../../store/note";

const DeletePlantModal = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { closeModal } = useModal();
	const [errors, setErrors] = useState([]);
	const note = useSelector((state) => state.notes.singleNote);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);

		dispatch(deleteNoteThunk(note.id))
			.then(() => history.push("/"))
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
				<h2>Delete this note?</h2>
				<p>(This is permanent and cannot be undone.)</p>
				<form onSubmit={handleSubmit}>
					<button type="submit">Confirm Delete</button>
                    {/* check plantsy button design */}
				</form>
			</div>
		</div>
	);
};

export default DeletePlantModal;
