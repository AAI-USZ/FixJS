function() {
			var obj = false;
			for(var i = 0, length = XMLHttpRequests.length; i < length; i++) {
				try {
					obj = XMLHttpRequests[i]();
				} catch(e) {
					continue;
				}
			}
			return obj;
		}