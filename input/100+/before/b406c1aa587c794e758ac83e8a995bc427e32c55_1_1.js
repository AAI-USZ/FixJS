function(items, key) {
		if (key && angular.isArray(items)) {
			var hashCheck = {},
				newItems = [];
			angular.forEach(items, function(item, key){
				var value;
				if (angular.isString(key)) {
					value = item[key];
				} else {
					value = item;
				}
				if (hashCheck[value] === undefined) {
					hashCheck[value] = true;
					newItems.push(item);
				}
			});
			items = newItems;
		}
		return items;
	}