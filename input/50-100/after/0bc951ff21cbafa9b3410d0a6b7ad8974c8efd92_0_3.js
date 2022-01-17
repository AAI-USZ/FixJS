function onUserMediaSuccess(stream) {
			console.log("User has granted access to local media.");
			var URL = window.webkitURL || window.URL;
			var url = URL.createObjectURL(stream);
			localVideo.style.opacity = 1;
			$(localVideo).bind('canplay', function() {
				createCanvasCapture();
			});
			localVideo.src = url;

			localVideo.autoplay = true;
		}