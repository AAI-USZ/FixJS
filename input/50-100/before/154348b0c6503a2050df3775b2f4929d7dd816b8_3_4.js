function stateIsValid(state) {
	return state.p.x > 0 && state.p.x < CANVAS_WIDTH && state.p.y > 0 && state.p.y < CANVAS_HEIGHT;
}