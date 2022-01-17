function(dest, from) {

	var list = [{
		identifier: uniqid,
		target: target,
		pageX: from.page.x,
		pageY: from.page.y,
		clientX: from.client.x,
		clientY: from.client.y
	}];

	dest.touches = list;
	dest.targetTouches = list;
	dest.changedTouches = list;

	return this;
}