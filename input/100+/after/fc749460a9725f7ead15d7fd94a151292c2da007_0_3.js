function()
{
  var currentState = null, baseUrl = null, cb = null, stateMap = { },
      w = window;

  function saveState(state) {
    stateMap[w.location.pathname + w.location.search] = state;
  }

  return {
    _initialize: function() { },

    _initTimeout: function() { },

    register: function (initialState, onStateChange) {
      currentState = initialState;
      cb = onStateChange;
      saveState(initialState);

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

      window.addEventListener("popstate", onPopState, false);
    },

    initialize: function (stateField, histFrame, deployUrl) {
      WT.resolveRelativeAnchors();

      baseUrl = deployUrl;
      if (baseUrl.length >= 1 && baseUrl[baseUrl.length - 1] == '/') {
_$_$if_UGLY_INTERNAL_PATHS_$_();
	baseUrl += "?_=";
_$_$endif_$_();
_$_$ifnot_UGLY_INTERNAL_PATHS_$_();
	baseUrl = baseUrl.substr(0, baseUrl.length - 1);
_$_$endif_$_();
      }
    },

    navigate: function (state, generateEvent) {
      WT.resolveRelativeAnchors();

      currentState = state;

      var url = baseUrl + gentleURIEncode(state);

      if (baseUrl.length < 3 || baseUrl.substr(baseUrl.length - 3) != "?_=") {
	url += window.location.search;
      } else {
	function stripHashParameter(q) {
	  if (q.length > 1)
	    q = q.substr(1);

	  var qp = q.split("&"), i, il;
	  q = "";

	  for (i=0, il = qp.length; i<il; ++i)
	    if (qp[i].split("=")[0] != '_')
	      q += (q.length ? '&' : '?') + qp[i];

	  return q;
	}

	var q = stripHashParameter(window.location.search);
	if (q.length > 1)
	  url += '&' + q.substr(1);
      }

      try {
	window.history.pushState(state ? state : "", document.title, url);
      } catch (error) {
	/*
	 * In case we are wrong about our baseUrl or base href
	 * In any case, this shouldn't be fatal.
	 */
	console.log(error.toString());
      }

      WT.scrollIntoView(state);

      if (generateEvent)
	cb(state);
    },

    getCurrentState: function () {
      return currentState;
    }
  };
}