function() {
				var slider = $('<div class="color-picker-vertical"><canvas class="color-picker-slider-track"></canvas></div>');
				var canvasTrack = slider.find('canvas');
				me._sliderCanvas = slider.find('.color-picker-slider-track')[0];
				slider.slider({
					range: true,
					orientation : "vertical",
					min : 0,
					max : 255,
					values : [me._zValue*255-10, me._zValue*255+10],
					slide : function(ev, ui) {
						me._zValue = Math.floor((ui.values[0] + ui.values[1])/2);
						var range = Math.floor((ui.values[1]-ui.values[0])/2);
						me._colorCanvas();
						console.log(me._zValue + " high" + ui.values[0] + " low"+ ui.values[1]);
						me.setHtoCenterRectangle(me._rectangle.$tag);
						var settings = {
							rangeHup: range,
							rangeHdown: range
						};
						imageFun.fx.hsvFilter.changeSettings(settings);
					}
				});
				var middleDiv = $('<div class="middle-of-slider"></div>');
				slider.find('.ui-slider-range').prepend(middleDiv);
				me._slider = slider;
			}