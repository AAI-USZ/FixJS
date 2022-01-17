function (location) {
			for (var i in this.resolvedLocations) {
				var l = this.resolvedLocations[i];
				if (l.scriptId === location.scriptId &&
					l.lineNumber === location.lineNumber &&
					l.columnNumber === location.columnNumber) {
					return true;
			}
			}
			return false;
		}