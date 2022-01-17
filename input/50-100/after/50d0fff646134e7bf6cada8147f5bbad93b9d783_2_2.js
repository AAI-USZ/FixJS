function (data) {
			if( typeof data !== "object" || !data._mutable ) {
				return data;
			}

			var copy = {};

			for( var key in data ) {
				copy[key] = copyData(data[key]);
			}

			return copy;
		}