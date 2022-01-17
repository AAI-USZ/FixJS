function()
{
  var currentState = null, baseUrl = null, cb = null;

  return {
    _initialize: function() { },

    _initTimeout: function() { },

    register: function (initialState, onStateChange) {
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