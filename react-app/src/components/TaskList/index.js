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
		<div className="whole-task-div">
			<h2>📝 Tasks:</h2>
			<div className="modal-button">
				<OpenModalButton
					className="create-plant-button"
					modalComponent={<CreateTaskModal />}
					buttonText="Add Task"
				/>
			</div>
			<div className="allTasks-container">
				{Object.values(allTasks).length ? (
					Object.values(allTasks).map((task) => (
						<div className="task-detail-container" key={task.id}>
							<div className="task-info" id="task-title">
								{task.title}
							</div>
							<div className="task-info" id="task-desc">
								{task.description}
							</div>
							<div className="task-info">
								Due on: {new Date(task.due_date).toLocaleDateString()}
							</div>
							<div id="complete-btn">
								<form onSubmit={(e) => handleSubmit(e, task.id)} key={task.id}>
									<button type="submit" className="wiggle-button">
										<span className="confirm">Completed</span>
									</button>
								</form>
							</div>
						</div>
					))
				) : (
					<h3 className="no-notes-message">
						You have no tasks. Click "ADD TASK" on the top left to make some
						tasks!
					</h3>
				)}
			</div>
		</div>
	);
};

export default NoteTask;
