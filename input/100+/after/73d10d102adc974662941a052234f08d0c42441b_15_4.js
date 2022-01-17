function (childNodeProperties) {
					var choice = {
							attributes : {},
							refs : []
						},
						containsChoice = false;

					// nested choices not supported
					assertEqual(childNodeProperties.choices.length, 0);

					$.each(childNodeProperties.refs, function (i, choiceRef) {
						choice.refs.push(choiceRef);
						containsChoice = true;
					});

					$.each(childNodeProperties.attributes, function (attributeName, attribute) {
						choice.attributes[attributeName] = attribute;
						containsChoice = true;
					});

					if (containsChoice) {
						choices.push(choice);
					}

					childNodeProperties.attributes = {};
				}