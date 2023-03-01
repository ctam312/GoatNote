import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createNotebookThunk } from "../../store/notebook";
import "./CreateNotebookForm.css";

function CreateNotebookModal() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { closeModal } = useModal();
	const [errors, setErrors] = useState([]);

	const [title, setTitle] = useState("");
    const user_id = useSelector((state) => state.session.user.id)



	const handleSubmit = async(e) => {
		e.preventDefault();
		setErrors([]);
		const newNotebook = {
			title,
            user_id
		};


		dispatch(createNotebookThunk(newNotebook))
			// console.log(plant)
			.then(() => {history.push(`/notebooks`)})

			.catch(async (res) => {
				if (res && res.errors) setErrors(res.errors);
			});
            closeModal()
	};

	return (
		<div className="add-plant-container">

			<div className="close-modal">
				<span style={{cursor:"pointer"}} onClick={closeModal}>
					<i className = "fa-solid fa-xmark" />
				</span>
			</div>

			<div className="add-spot-header">
				<h1>Create a Notebook</h1>
			</div>

			<div className="add-spot-errors">
				<ul className="errors-map">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
			</div>

			<form className="add-plant-form" onSubmit={handleSubmit}>
				<div>
					<div className="label-tag-container">
						<label className="add-spot-form-label">
							Title:
							<input
							className = "add-spot-form-input"
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								maxLength="50"
								required
							/>
						</label>
					</div>

                    <div className = "submitBtn">
					<button className="log-in-demo-button" type="submit">
						Create Notebook
					</button>
                    </div>
				</div>
			</form>
		</div>
	);
}

export default CreateNotebookModal;
