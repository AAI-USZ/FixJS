function onPopState(event) {
	var newState = event.state;

	if (newState == null)
	  newState = stateMap[w.location.pathname + w.location.search];

	if (!newState) {
	  saveState(currentState);
	  return;
	}

	if (newState != currentState) {
	  currentState = newState;
	  onStateChange(currentState != "" ? currentState : "/");
	}
      }