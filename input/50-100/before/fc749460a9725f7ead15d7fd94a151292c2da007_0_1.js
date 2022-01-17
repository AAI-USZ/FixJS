function onPopState(event) {
	var newState = event.state;

	/*
	 * A null state event is given onload, but we may already have
	 * pushed another state... this is simply silly.
	 *
	 * see http://html5.org/tools/web-apps-tracker?from=5345&to=5346
	 */

	if (!newState)
	  if (expectNullState) {
	    expectNullState = false;
	    return;
	  } else
	    newState = initialState;

	if (newState != currentState) {
	  currentState = newState;
	  onStateChange(currentState != "" ? currentState : "/");
	}
      }