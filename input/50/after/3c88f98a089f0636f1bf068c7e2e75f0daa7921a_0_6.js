function scopedToUrl() {
			var args = Array.prototype.slice.call(arguments, 0);
			_t.plugin === null && (args[1] = _t);
			return toUrl.apply(null, args);
		}