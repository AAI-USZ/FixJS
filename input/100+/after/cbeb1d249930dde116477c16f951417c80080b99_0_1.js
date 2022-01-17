function(ev, ui) {
				var cell = hoverListener.stop();
				clearOverlays();
				trigger('eventDragStop', eventElement, event, ev, ui);
				if (cell && (dayDelta || minuteDelta || allDay)) {
					// changed!
					var realDayDelta = dayDelta;
					if(t.showKabinen === true){
						//TODO This only works for the DayView! If you show another view you have to calc the real dayDelta here!
						realDayDelta = 0;
						event.kabine = getCabinNameDelta(event.kabine, dayDelta);
					}
						
					eventDrop(this, event, realDayDelta, allDay ? 0 : minuteDelta, allDay, ev, ui);
				}else{
					// either no change or out-of-bounds (draggable has already reverted)
					resetElement();
					eventElement.css('filter', ''); // clear IE opacity side-effects
					eventElement.css(origPosition); // sometimes fast drags make event revert to wrong position
					updateTimeText(0);
					showEvents(event, eventElement);
				}
			}