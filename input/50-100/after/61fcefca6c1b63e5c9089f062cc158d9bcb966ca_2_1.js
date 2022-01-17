function tick() {
	if(SM.currentState.name == 'ingame') {
		controller.interaction();
	}
	if(SM.currentState.name == 'ingame') {
		controller.update();
	}
	if(SM.currentState.name == 'ingame') {
		orderSummary.render();
	}
}