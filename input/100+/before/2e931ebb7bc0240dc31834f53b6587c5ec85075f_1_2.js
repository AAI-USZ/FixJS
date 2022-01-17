function() {
			
			// START AT END?
			if (config.start_at_end && config.current_slide == 0) {
				config.current_slide = _dates.length - 1;
			}

            if (config.start_at_current_date)
            {
                var eventNumber = 0;
                var minDistance = _dates[0].fulldate;
                var tempDistance = 0;
                var dateCurrent = (new Date()).getTime();

                for (var iteratorDates = 0; iteratorDates < _dates.length; iteratorDates++) {
                    tempDistance = Math.abs(dateCurrent - _dates[iteratorDates].fulldate);

                    if (tempDistance <= minDistance) {
                        minDistance = tempDistance;
                        eventNumber = iteratorDates;
                    }
                }

                config.current_slide = eventNumber;
            }

            // CREATE DOM STRUCTURE
			VMM.attachElement($timeline, "");
			VMM.appendElement($timeline, "<div class='container main'><div class='feature'><div class='slider'></div></div><div class='navigation'></div></div>");
			
			reSize(true);
			
			VMM.bindEvent("div.slider", onSliderLoaded, "LOADED");
			VMM.bindEvent("div.navigation", onTimeNavLoaded, "LOADED");
			VMM.bindEvent("div.slider", onSlideUpdate, "UPDATE");
			VMM.bindEvent("div.navigation", onMarkerUpdate, "UPDATE");
			
			slider.init(_dates);
			timenav.init(_dates, data.era);
			
			// RESIZE EVENT LISTENERS
			VMM.bindEvent(global, reSize, config.events.resize);
			//VMM.bindEvent(global, function(e) {e.preventDefault()}, "touchmove");
			
		}