function replaceNative(array, index, removeCount, insert) {
		if (insert && insert.length) {
			if (index < array.length) {
				array.splice.apply(array, [index, removeCount].concat(insert));
			}
			else {
				array.push.apply(array, insert);
			}
		}
		else {
			array.splice(index, removeCount);
		}
		return array;
	}