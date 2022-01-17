function doTimedEvent() {

	if (paused) {

		document.getElementById('reset').enable();

		document.getElementById('pause').disable();

		document.getElementById('error').disable();

		document.getElementById('watch').enable();

		return;

	}

	if (percent > 100) {

		percent = 4;

		document.getElementById('reset').enable();

		document.getElementById('pause').disable();

		document.getElementById('error').disable();

		document.getElementById('watch').enable();

		return;

	}

	setValuesToPercent(percent);

	percent = percent + 4;

	setTimeout('doTimedEvent()', 100);          

}