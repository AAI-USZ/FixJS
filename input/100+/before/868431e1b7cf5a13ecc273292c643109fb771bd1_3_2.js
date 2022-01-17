function(e, t) {
	var n, //refers to the eval'ed event handler function
		r = e.previousSibling; //refers to the comment element
	eval("n=e.on" + t[0].type + "=" + r.textContent + ";");
	e.parentNode.removeChild(r);
	return n.apply(e, t);
}