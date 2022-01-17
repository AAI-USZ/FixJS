function (copySource) {
		if (typeof(copySource) === "undefined") {
			return {
				elements : {},
				attributes : {},
				refs : [],
				refQuantifiers : {},
				attributeValues : [],
				textNode : false,
				list : false,
				choices : [],
				documentation : ""
			};
		} else {
			// deep copy
			return JSON.parse(JSON.stringify(copySource));
		}
	}