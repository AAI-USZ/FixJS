function(cell, origCell, rowDelta, colDelta) {
					eventElement.draggable('option', 'revert', !cell);
					clearOverlays();
					if (cell) {
						dayDelta = colDelta * dis;
						if (opt('allDaySlot') && !cell.row) {
							// over full days
							if (!allDay) {
								// convert to temporary all-day event
								allDay = true;
								timeElement.hide();
								eventElement.draggable('option', 'grid', null);
							}						
							renderDayOverlay(
									addDays(cloneDate(event.start), dayDelta),
									addDays(exclEndDay(event), dayDelta)
							);
						}else{
							// on slots
							resetElement();
						}
					}
				}