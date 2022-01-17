function getUserMedia() {
			try {
				navigator.webkitGetUserMedia({
					video : true
				}, onUserMediaSuccess, onUserMediaError);
				console.log("Requested access to local media.");
			} catch (e) {
				var s;
				var p = $('<p></p>');
				s = 'could not get webcam stream. Use a browser that supports getUserMedia API.';
				s += 'Known to run in Google Chrome 20 (jul 3, 2012) with mediaStream flag enabled';
				p.html(s);
				$('body').empty().append(p);
				console.log("getUserMedia error.");
			}
		}