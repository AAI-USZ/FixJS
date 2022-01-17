function(e) {

	var touch = {
		identifier: uniqid,
		target: target,
		pageX: e.page.x,
		pageY: e.page.y,
		clientX: e.client.x,
		clientY: e.client.y
	};

	e.touches = e.targetTouches = e.changedTouches = [touch];

	if (e.event.fake) {
		e.stop();
		return true;
	}

	return false;
}