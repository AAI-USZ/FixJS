function(evt) {
						var gridEvent = createGridEvent(evt);
						
						if (settings.mousemove != null) {
							settings.mousemove.call(this, gridEvent);
						}
						
						if (currentX != gridEvent.cell.x || currentY != gridEvent.cell.y) {
							if (settings.mouseleave != null && currentX != -1 && currentY != -1) {
								
								var leaveEvent = $.extend(true, {}, gridEvent);
								leaveEvent.cell.x = currentX;
								leaveEvent.cell.y = currentY;
								
								settings.mouseleave.call(this, leaveEvent);
							}
							
							if (settings.mouseenter != null) {
								settings.mouseenter.call(this, gridEvent);
							}
							
							currentX = gridEvent.cell.x;
							currentY = gridEvent.cell.y;
						}
					}