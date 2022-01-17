function (array, elem, comparator) {
		ASSERT(array.constructor === Array);
		ASSERT(elem && comparator);

		var index = binarySearch(array, elem, comparator);
		array.splice(index, 0, elem);
	}