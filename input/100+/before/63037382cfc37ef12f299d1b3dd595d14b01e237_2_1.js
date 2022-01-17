function (state, generateEvent) {
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
    }