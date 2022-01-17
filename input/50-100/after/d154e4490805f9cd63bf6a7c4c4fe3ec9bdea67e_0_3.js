function (i, attribute) {
		if (attribute.key !== "match" && attribute.enabled) {
			$.each(attribute.value.split(" "), function (i, value) {
				that.conditions.push({
					attribute : attribute.key,
					value : value
				});
			});
		}
	}