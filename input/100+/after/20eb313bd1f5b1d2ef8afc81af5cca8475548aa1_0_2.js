function(ev, ui) {
						me._zValue = ((ui.values[0] + ui.values[1])/2);
						var range = ((ui.values[1]-ui.values[0])/2);
						me._colorCanvas();
						console.log(me._zValue + " high" + ui.values[0] + " low"+ ui.values[1]);
						me.setHtoCenterRectangle(me._rectangle.$tag);
						var settings = {
							rangeHup: range,
							rangeHdown: range
						};
						imageFun.fx.hsvFilter.changeSettings(settings);
					}