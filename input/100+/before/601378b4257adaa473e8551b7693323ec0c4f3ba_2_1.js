function ($, audioletApp) {
		"use strict";
		
		// structural variables:
		var numRows = 3;
		var rows = new Array(numRows);
		// keep a list of sample names:
		var sample = {"bass_drum":0, "hi_hat":1, "snare_drum":2};

		var patternLength = 32;
		var activeColumn = 0;

		// design variables:
		var canvas = null;
		var context = null;
		var channels = null;

		var noteWidth = 10;
		var noteHeight = 10;

		var noteSoftColor = '#222222';
		var noteMedColor = '#359aff';
		var noteLoudColor = '#48ffff';

		console.log(audioletApp);

		function _initCanvas(options) {

			channels = audioletApp.init();

			/* OPTIONS FUNCITONALITY ADDED BY ANDY */
			canvas = options.canvas;
			context = options.context;
			noteWidth = options.noteWidth;
			noteHeight = options.noteHeight;

			// get patterns list:
			rows[sample.bass_drum] = channels[0].pattern.list;
			rows[sample.hi_hat] = channels[1].pattern.list;
			rows[sample.snare_drum] = channels[2].pattern.list;

			patternLength = rows[sample.bass_drum].length;

			_draw();
		}

		function _draw() {
			// move horizontally (time wise)
			for (var i = 0; i < patternLength; i++) {
				// move vertically (rows)
				for (var j = 0; j < numRows; j++) {
					if (rows[j][i] == 0) {
						context.fillStyle = noteSoftColor;
					} else if (rows[j][i] == 1) {
						context.fillStyle = noteMedColor;
					} else if (rows[j][i] == 2) {
						context.fillStyle = noteLoudColor;
					}

					context.fillRect(i * noteWidth, j * noteHeight, noteWidth-1, noteHeight-1);
				/*
				context.beginPath()
				var x = i * noteWidth + (noteWidth/2);
				var y = j * noteHeight + (noteHeight/2);
				context.arc(x, y, noteWidth/2, 0, Math.PI*2)
				context.fill()*/

				}
			}
		}

		function _animate() {
			context.clearRect(0, 0, canvas.width(), canvas.height());
			_draw();
			context.fillRect(activeColumn * noteWidth, 0, 1, noteHeight * numRows);
			activeColumn = (activeColumn + 1) % patternLength;
		}

		function _togglePixel(xClick, yClick) {
			// toggle amplitude and update graphics array (rows)
			var amplitude = (rows[yClick][xClick] + 1) % 3;
			rows[yClick][xClick] = amplitude;

			// update audiolet sequence
		}

		function _drawRuler() {
			var ruler = $('#ruler');
			if (ruler[0] !== undefined) {
	 			var rulerContext = ruler[0].getContext("2d");

				//rulerContext.fillStyle = noteSoftColor;
				//rulerContext.fillRect(0, 0, ruler.width(), ruler.height());
				for (var i = 0; i <= patternLength; i++) {
					rulerContext.strokeStyle = "#fff";
					rulerContext.stroke();
					// draw half notes:
					if (i % 8 == 0) {
						rulerContext.moveTo(i * noteWidth, 0);
						rulerContext.lineTo(i * noteWidth, ruler.height());
					} else if (i % 4 == 0) {
						rulerContext.moveTo(i * noteWidth, 0);
						rulerContext.lineTo(i * noteWidth, ruler.height() * 0.5);
					} else if (i % 2 == 0) {
						rulerContext.moveTo(i * noteWidth, 0);
						rulerContext.lineTo(i * noteWidth, ruler.height() * 0.35);
					} else {
						rulerContext.moveTo(i * noteWidth, 0);
						rulerContext.lineTo(i * noteWidth, ruler.height() * 0.15);
					}
				}
				// rulerContext.strokeRect(0, 0, ruler.width(), ruler.height());
			}
		}

		return {
			initCanvas: _initCanvas,
			draw: _draw,
			animate: _animate,
			togglePixel: _togglePixel,
			drawRuler: _drawRuler
		};
	}