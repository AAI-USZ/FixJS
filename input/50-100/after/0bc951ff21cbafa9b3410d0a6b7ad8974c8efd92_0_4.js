function init() {
			canvas = document.getElementById('canvas');
			canvasBuff = document.createElement('canvas');
			canvasContext = canvas.getContext('2d');
			canvasBuffContext = canvasBuff.getContext('2d');
			localVideo = document.getElementById('video');
			samplingTimeout = null;
			
			addFunctionOptions();
			getUserCamera();
			//obtaining media successfully starts the interval to get the video image
		}