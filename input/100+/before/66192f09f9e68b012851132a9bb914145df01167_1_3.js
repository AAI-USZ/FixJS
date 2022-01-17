function extendOptionsArray(distArray, sourceArray) {
		return ko.utils.arrayGetDistinctValues(
			ko.utils.arrayPushAll(distArray, sourceArray)
		);
	}