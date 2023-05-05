import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createTaskThunk } from "../../store/task";
import "./CreateTaskForm.css";

function CreateTaskModal() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { closeModal } = useModal();
	const [errors, setErrors] = useState([]);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [due_date, setDue_date] = useState("");
	const user_id = useSelector((state) => state.session.user.id);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);
		const newTask = {
			title,
			description,
			due_date,
			user_id,
		};

		dispatch(createTaskThunk(newTask))
			.then(() => {
				history.push(`/notes`);
			})

			.catch(async (res) => {
				if (res && res.errors) setErrors(res.errors);
			});
		closeModal();
	};

	return (
		<div>
			<div className="x-button">
				<span style={{ cursor: "pointer" }} onClick={closeModal}>
					<i className="fa-solid fa-xmark" />
				</span>
			</div>
			<div className="delete-pop-up">
				<div className="add-spot-header">
					<h1>Create a Task</h1>
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
									className="add-spot-form-input"
									type="text"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									required
									placeholder="Enter Title Here"
									onBlur={(e) => {
										if (e.target.value.length > 20) {
											alert("Title should be no more than 20 characters");
										}
									}}
								/>
								<input
									className="add-spot-form-input"
									type="text"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									required
									placeholder="Enter Description Here"
									onBlur={(e) => {
										if (e.target.value.length > 20) {
											alert("Title should be no more than 20 characters");
										}
									}}
								/>
								<input
									className="add-spot-form-input"
									type="date"
									value={due_date}
									onChange={(e) => setDue_date(e.target.value)}
									required
								/>
							</label>
						</div>

						<div className="submitBtn">
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

export default CreateTaskModal;
