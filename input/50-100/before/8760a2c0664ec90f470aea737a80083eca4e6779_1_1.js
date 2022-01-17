function (obj, eventName, listener) {
			
			obj = makeDomElement(obj);

			if (obj.length) { // it's an array of elements
				for (var i = 0, l = obj.length; i<l; i++) {
				    bindEvent(obj[i], eventName, listener);
				}
			} else {
				bindEvent(obj, eventName, listener);
			}
		}