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
		<div>
			<div className="x-button">
				<span style={{cursor:"pointer"}} onClick={closeModal}>
					<i className = "fa-solid fa-xmark" />
				</span>
			</div>
			<div className="delete-pop-up">


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
				<div className="notebook-create-wrap">
					<div className="label-tag-container">
						<label className="add-spot-form-label">
							<input
							className = "add-spot-form-input"
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
								placeholder='Enter Title Here'
								onBlur={(e) => {
									if (e.target.value.length > 20) {
										alert("Title should be no more than 20 characters");
									}
								}}
							/>
						</label>
					</div>

                    <div className = "submitBtn">
					<button type="submit" class="ctam">
						<span>Create</span>
						<svg viewBox="0 0 13 10" height="10px" width="15px">
							<path d="M1,5 L11,5"></path>
							<polyline points="8 1 12 5 8 9"></polyline>
						</svg>
					</button>
                    </div>
				</div>
			</form>
			</div>
		</div>
	);
}

export default CreateNotebookModal;
