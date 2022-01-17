function (array, elem, comparator) {
		ASSERT(array.constructor === Array);
		ASSERT(elem && typeof comparator === "function");

		var index = binarySearch(array, elem, comparator);
		array.splice(index, 0, elem);
	}