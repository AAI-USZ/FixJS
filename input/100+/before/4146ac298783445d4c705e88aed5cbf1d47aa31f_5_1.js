function (type, dict) {// CustomEvent constructor
	var e;
	try {
		e = document.createEvent("CustomEvent");
	}
	catch(err) {//FF 3.6 cant create "CustomEvent"
		e = document.createEvent("Event");
	}

	dict = dict || {};
	dict.detail = (dict.detail !== void 0) ? dict.detail : null;
	(e.initCustomEvent || (e.detail = dict.detail, e.initEvent)).call
		(e, type, dict.bubbles || false, dict.cancelable || false, dict.detail);
	if(!("isTrusted" in e))e.isTrusted = false;

	return e;
}