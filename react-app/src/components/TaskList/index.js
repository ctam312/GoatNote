import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllTasksThunk } from "../../store/task";
import OpenModalButton from "../OpenModalButton";
import CreateTaskModal from "../CreateTaskForm";
import { deleteTaskThunk } from "../../store/task";
import "./TaskList.css";

const NoteTask = () => {
	const dispatch = useDispatch();
	const allTasks = useSelector((state) => state.tasks.allTasks);
	const task = useSelector((state) => state.tasks.singleTask);
	console.log("THIS IS THE TASK FR", task);
	const history = useHistory();
	const [errors, setErrors] = useState([]);

	const handleSubmit = async (e, taskId) => {
		e.preventDefault();
		setErrors([]);

		dispatch(deleteTaskThunk(taskId))
			.then(() => history.push("/notes"))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
	};

	useEffect(() => {
		dispatch(getAllTasksThunk());
	}, [dispatch]);

	return (
		<div className="peer-review-div">
			<div className="notes-component">
				<div className="notes-list-container">
					<div className="notes-list-inner-cont">
						<h2>📝 Tasks:</h2>
						<OpenModalButton
							className="create-plant-button"
							modalComponent={<CreateTaskModal />}
							buttonText="Create New Task"
						/>
						<div className="allTasks-container">
							{Object.values(allTasks).length ? (
								Object.values(allTasks).map((task) => (
									<div className="note-detail-container" key={task.id}>
										<div className="notes-info" id="note-title">
											{task.title}
										</div>
                                        <div className="notes-info" id="note-desc">
											{task.description}
										</div>
										<div className="notes-info">
											Due on: {new Date(task.due_date).toLocaleDateString()}
										</div>
										<div>
											<form
												onSubmit={(e) => handleSubmit(e, task.id)}
												key={task.id}
											>
												<button type="submit">
													<span className="confirm">Completed</span>
												</button>
											</form>
										</div>
									</div>
								))
							) : (
								<h3 className="no-notes-message">
									You have no tasks. Click "on the +" on the top right to make
									some tasks!
								</h3>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NoteTask;
