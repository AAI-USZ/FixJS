function() {
			var o = false;
			for (var i = 0, l = RequestObj.length; i < l; i++) {
				try { o = RequestObj[i]();
				} catch(e) { continue; }
			}
			return o;
		}