function(cm) {

			if (aigua.modes[aigua.currentModeIndex].name == 'javascript') {

				var cursor;
				var token;
				var startCoords;
				var endCoords;
				var center;

				// is the slider hidden?
				if (!aigua.slider.is(':visible')) {

					// grab the current token
					cursor = cm.getCursor();
					token = cm.getTokenAt(cursor);

					// are we on a number?
					if (token.className == 'number') {

						if (aigua.pulseNumbers) {
							// stop pulsing numbers
							window.clearInterval(aigua.pulse);
							$('#message').hide();
							aigua.pulseNumbers = false;
						}

						// show the slider
						aigua.slider.show();

						// save the original number
						if (aigua.originalNumber == null) {
							aigua.originalNumber = Number(token.string);
						}

						// select token
						cm.setSelection({line: cursor.line, ch: token.start}, {line: cursor.line, ch: token.end});

						// find coords at token start
						startCoords = cm.cursorCoords(true);
						endCoords = cm.cursorCoords(false);

						// center marker on token
						center = startCoords.x + (endCoords.x - startCoords.x)/2;
						aigua.marker.css('left', center);

						// center handle on token
						aigua.handle.css('left', center - aigua.handle.width()/2);

						// center bar above token
						aigua.bar.css('left', center - aigua.bar.width()/2 - aigua.borderWidth);
						aigua.bar.css('top', startCoords.y - aigua.lineHeight);

						// center triangle on token
						aigua.triangle.css('left', center - aigua.triangleWidth);
						aigua.triangle.css('top', aigua.bar.offset().top + aigua.bar.height() + aigua.borderWidth * 2);

						aigua.ball.offset({top: aigua.filler.offset().top});
					}
				}
			}
		}