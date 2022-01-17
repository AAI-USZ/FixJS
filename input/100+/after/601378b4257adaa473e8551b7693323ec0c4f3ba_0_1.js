function() {
					var canvas = $('#sequence'),
						button = $('#button'),
						context = canvas[0].getContext("2d"),
						noteWidth = canvas.width() / patternLength,
						noteHeight = canvas.height() / numRows;

					

					button.click(function(e) {
						canvasApp.initCanvas({
							canvas: canvas,
							context: context,
							noteWidth: noteWidth,
							noteHeight: noteHeight
						});
					});

					canvas.click(function(e) {
						// get click coordinates relative to the canvas:
						var xClick = e.pageX - canvas.offset().left;
						var yClick = e.pageY - canvas.offset().top;
						// get matrix indexes:
						xClick = Math.floor(xClick / noteWidth);
						yClick = Math.floor(yClick / noteHeight);
						canvasApp.togglePixel(xClick, yClick);
					});

					canvasApp.drawRuler();
				}