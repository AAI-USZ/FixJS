function createCanvasCapture() {
			var w = $(localVideo).width();
			var h = $(localVideo).height();
			canvasBuff.width = w;
			canvasBuff.height = h;

			canvas.width = w;
			canvas.height = h;
			imageData = canvas.getContext('2d').getImageData(0, 0, w, h);
			clearTimeout(samplingTimeout);
			samplingTimeout = setTimeout(samplingTimeoutCall, samplingPeriod);
		}