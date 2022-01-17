function(fn, context) {

			for(var i = 0, len = this.length >>> 0; i < len; i++) {

				if(i in this && !fn.call(context, this[i], i, this)) {

					return false;

				}

			}

			return true;

		}