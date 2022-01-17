function (node) {
		var index;

		$.each(node.choices, function (i, choice) {
			$.each(choice.refs, function (i2, ref) {
				var define = defineProperties[ref];
				attributesMerge(choice.attributes, define.attributes);
			});
			//delete choice.refs;
		});
		$.each(node.choices, function (i, choice) {
			var attributeName;
			for (attributeName in choice.attributes) {
				// already mostly simplified, just need to dereference the attr. values
				simplifyAttributeValues(choice.attributes, attributeName);
			}
		});

		// remove any choices with no attributes
		for (index=0; index<node.choices.length; index++) {
			if (Object.keys(node.choices[index].attributes).length === 0) {
				node.choices.splice(index,1);
				index--;
			}
		}
	}