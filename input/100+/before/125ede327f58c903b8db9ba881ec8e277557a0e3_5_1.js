function(status, source, sourceEffect) {
		status = selfB.getEffect(status);
		if (sourceEffect !== undefined && selfB.effect) sourceEffect = selfB.effect;
		if (source !== undefined && selfB.event && selfB.event.target) source = selfB.event.target;

		if (selfB.weather === status.id) return false;
		if (selfB.weather && !status.id) {
			var oldstatus = selfB.getWeather();
			selfB.singleEvent('End', oldstatus, selfB.weatherData, selfB);
		}
		var prevWeather = selfB.weather;
		var prevWeatherData = selfB.weatherData;
		selfB.weather = status.id;
		selfB.weatherData = {id: status.id};
		if (source) {
			selfB.weatherData.source = source;
			selfB.weatherData.sourcePosition = source.position;
		}
		if (status.duration) {
			selfB.weatherData.duration = status.duration;
		}
		if (status.durationCallback) {
			selfB.weatherData.duration = status.durationCallback.call(selfB, source, sourceEffect);
		}
		if (!selfB.singleEvent('Start', status, selfB.weatherData, selfB, source, sourceEffect)) {
			selfB.weather = prevWeather;
			selfB.weatherData = prevWeatherData;
			return false;
		}
		selfB.update();
		return true;
	}