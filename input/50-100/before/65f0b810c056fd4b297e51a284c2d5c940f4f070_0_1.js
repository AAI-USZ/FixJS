function (location) {
			for (var i in this.resolvedLocations) {
				var l = this.resolvedLocations[i];
				if (l.url === location.url &&
					l.lineNumber === location.lineNumber &&
					l.columnNumber === location.columnNumber)
					return true;
			}
			return false;
		}