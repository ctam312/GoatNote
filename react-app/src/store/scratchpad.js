const GET_SCRATCHPAD = "scratchpad/GET_SCRATCHPAD";
const UPDATE_SCRATCHPAD = "scratchpad/UPDATE_SCRATCHPAD";

export const getScratchpad = (scratchpad) => ({
	type: GET_SCRATCHPAD,
	payload: scratchpad,
});

export const updateScratchpad = (newScratchpad) => ({
	type: UPDATE_SCRATCHPAD,
	payload: newScratchpad,
});

export const getScratchpadThunk = () => async (dispatch) => {
	const res = await fetch("/api/scratchpad/");
	if (res.ok) {
		const data = await res.json();
		dispatch(getScratchpad(data.scratchpad));
		return null;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	}
	return { errors: ["An error occurred. Please try again."] };
};

export const updateScratchpadThunk = (scratchpad) => async (dispatch) => {
	const res = await fetch(`/api/scratchpad/`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ content: scratchpad }),
	});
	if (res.ok) {
		const data = await res.json();
		dispatch(updateScratchpad(data));
		return null;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	}
};

export default function scratchpadReducer(state = {}, action) {
	let newState = {};
	switch (action.type) {
		case GET_SCRATCHPAD:
			newState[action.payload.id] = action.payload;
			return newState;

		case UPDATE_SCRATCHPAD:
			newState[action.payload.id] = action.payload;
			return newState;
		default:
			return state;
	}
}
