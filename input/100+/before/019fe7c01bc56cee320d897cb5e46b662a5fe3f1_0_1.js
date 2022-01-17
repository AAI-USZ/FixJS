function(key) {
	var count = this.options.recommendationsCount;
	var getSimilarity = this.options.getSimilarity;
	var dataSet = this.dataSet;
	
	var totals = {};
	var similaritySums = {};
	
	// don't compare me to myself
	for (var otherKey in dataSet) {
		if (otherKey === key) {
			continue;
		}
		
		var similarity = getSimilarity(dataSet, key, otherKey);
		// ignore scores of zero of lower
		if (similarity <= 0) {
			continue;
		}
		
		// only score items I haven't answered yet
		for (var itemKey in dataSet[otherKey]) {
			if (typeof(dataSet[key][itemKey]) !== 'undefined') {
				if (typeof(totals[itemKey]) === 'undefined') {
					totals[itemKey] = 0;
					similaritySums[itemKey] = 0;
				}
				// similarity * score
				totals[itemKey] += dataSet[otherKey][itemKey] * similarity;
				// sum of similarities
				similaritySums[itemKey] += similarity;
			}	
		}
	}
	
	// create the normalized list
	var rankings = [];
	for (var itemKey in totals) {
		rankings.push({
			key: itemKey,
			similarity: totals[itemKey] / similaritySums[itemKey]
		});
	}
	// return the reverse sorted list
	rankings.sort( function(obj1, obj2) {
		return obj2.similarity - obj1.similarity;
	});
	return rankings.slice(0, count);
}