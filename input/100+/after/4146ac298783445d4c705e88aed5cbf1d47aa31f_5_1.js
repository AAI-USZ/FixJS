function (type, dict) {// CustomEvent constructor
	var e
	  , _detail
	;
	try {
		e = document.createEvent("CustomEvent");
	}
	catch(err) {//FF 3.6 cant create "CustomEvent"
		e = document.createEvent("Event");
	}

	dict = dict || {};
	_detail = dict.detail !== void 0 ? dict.detail : null;
	(e.initCustomEvent || (e.detail = _detail, e.initEvent)).call
		(e, type, dict.bubbles || false, dict.cancelable || false, _detail);
	if(!("isTrusted" in e))e.isTrusted = false;

	return e;
}