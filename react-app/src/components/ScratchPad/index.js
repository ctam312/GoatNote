import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {getScratchpadThunk, updateScratchpadThunk} from "../../store/scratchpad";
import "./ScratchPad.css";

export default function ScratchPad() {
	const [scratchpad, setScratchpad] = useState("");
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const scratchpadState = useSelector((state) => state.scratchpad);

	useEffect(() => {
		if (user) {
			dispatch(getScratchpadThunk());
		}
	}, [dispatch]);

	useEffect(() => {
		if (Object.keys(scratchpadState).length > 0) {
			setScratchpad(Object.values(scratchpadState)[0].content);
		}
	}, [scratchpadState]);

	const handleSave = (e) => {
		e.preventDefault();
		dispatch(updateScratchpadThunk(scratchpad));
	};

	const handleClear = (e) => {
		e.preventDefault();
		setScratchpad("");
		dispatch(updateScratchpadThunk(""));
	};
	return (
		<div className="scratch-main-container">
			<div className="scratch-title-container">
				<h1>ScratchPad</h1>
				<div className="scratch-actions">
					<button className="evernote-btn" onClick={handleSave}>
						save
					</button>
					<button className="evernote-btn" onClick={handleClear}>
						clear
					</button>
				</div>
			</div>
			<textarea
				className="scratch-textarea"
				name="scratchpad"
				id="scratchpad"
				cols="30"
				rows="10"
				maxLength="700"
				value={scratchpad}
				onChange={(e) => setScratchpad(e.target.value)}
				placeholder="Click here to scratch out some ideas..."
			/>
		</div>
	);
}
