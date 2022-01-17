function(type, cb) {
        	if (type === "idle") {
				if (pageLoaded) {
					callback();
				} else {
					readyCallbacks.push(callback);
				}
        	} else {
        		console.log("Unsupported 'on' type ["+type+"]");
        	}
        }