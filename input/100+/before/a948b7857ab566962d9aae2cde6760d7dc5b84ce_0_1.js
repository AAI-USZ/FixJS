function(e) { 
				// Only trigger if they've started, and the target matches:
				var end_x = (settings.touch_capabale) ? e.targetTouches[0].pageX : e.pageX,
					end_y = (settings.touch_capabale) ? e.targetTouches[0].pageY : e.pageY;
				
				if(origTarget == event.target && started && ((new Date().getTime() - start_time) < settings.taphold_threshold) && (start_pos.x == end_x && start_pos.y == end_y))
				{
					triggerCustomEvent(thisObject, 'tap', e);
				}
			}