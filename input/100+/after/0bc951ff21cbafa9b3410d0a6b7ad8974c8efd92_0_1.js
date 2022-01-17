function getUserCamera() {
			try {
				/*chrome cant make assignment of js var to point to native code*/
				var getUserMediaStrings = ['getUserMedia','webkitGetUserMedia']; 
				var i;
				var getUserMediaString=getUserMediaStrings[0];
				for(i=0;i<getUserMediaStrings.length;i+=1){
					if(navigator[getUserMediaStrings[i]]){
						getUserMediaString=getUserMediaStrings[i];
					}
				}
				navigator[getUserMediaString]({
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