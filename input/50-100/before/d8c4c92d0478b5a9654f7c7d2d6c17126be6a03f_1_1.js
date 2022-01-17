function(move) {
			if (move.id = 'sunnyday') {
				var weather = move.weather;
				move.weather = null;
				move.onHit = function(target, source) {
					this.setWeather(weather, source, 'forecast');
					this.weatherData.duration = 0;
				};
				move.target = 'self';
				move.sideCondition = 'flowergift';
			}
		}