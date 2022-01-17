function (initialState, onStateChange) {
      currentState = initialState;
      cb = onStateChange;
      var expectNullState = WT.isWebKit;

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

      function onHashChange() {
	var p = window.location.hash;
	var newState = null;
	if (p == '')
	  newState = p;
	else if (p.substr(0, 2) == '#/')
	  newState = p.substr(2);
	if (newState !== currentState) {
	  currentState = newState;
	  onStateChange(currentState);
	}
      }

      window.addEventListener("popstate", onPopState, false);
      window.addEventListener("hashchange", onHashChange, false);
    }