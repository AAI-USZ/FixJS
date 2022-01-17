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
				choiceRefs : [],
				documentation : ""
			};
		} else {
			// deep copy
			console.log("copied: " + JSON.stringify(copySource));
			return JSON.parse(JSON.stringify(copySource));
		}
	}