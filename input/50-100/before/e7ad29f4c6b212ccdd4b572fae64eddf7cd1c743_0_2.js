function(names, values) {
			if (names == null) {
				return this; //NOTE, this line represent the final return value of annonymous method instead of the mergeValidator wrapper.
			}
			
			//determine if the arguments is a pair-value.
			if (XM.isString(names)) {
				fn.call(this, names, values);
			}
			//determine if the arguments is a pair-value in an object.
			else {
				for (var i in names) {
					if (names.hasOwnProperty(k)) {
						fn.call(this, i, names[i]);
					}
				}
			}
			
			return this; //NOTE, this line represent the final return value of annonymous method instead of the mergeValidator wrapper.
		}