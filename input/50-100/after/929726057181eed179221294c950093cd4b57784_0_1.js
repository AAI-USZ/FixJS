function clearTimer() {
		if (timer)
			clearInterval(timer);
		timer = null;
	}