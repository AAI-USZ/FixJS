function (node) {
			var choices = [],
				choiceRefs = [],
				thisNodeProperties,
				applyToEachChild = function (childNodeProperties) {
					// nested choices not supported
					assertEqual(childNodeProperties.choices.length, 0);

					$.each (childNodeProperties.refs, function (i, choiceRef) {
						choiceRefs.push(choiceRef);
					});

					$.each(childNodeProperties.attributes, function () {
						choices.push(childNodeProperties.attributes);
						return false;
					});

					childNodeProperties.attributes = {};
				};

			thisNodeProperties = parseChildren(node, applyToEachChild);
			thisNodeProperties.choices = choices;
			thisNodeProperties.choiceRefs = choiceRefs;

			return thisNodeProperties;
		}