function trim (array) {
			var start;
			for (start = 0; start < array.length; start++) {
				if (array[start] !== "") {
					break;
				}
			}

			var end;
			for (end = array.length - 1; end >= 0; end--) {
				if (array[end] !== "") {
					break;
				}
			}

			if (start > end)
				return [];

			return array.slice(start, end - start + 1);
		}