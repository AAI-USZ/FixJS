function (propertiesA, propertiesB) {
		var element,
			documentation = [];

		$.each(propertiesB.elements, function (element, quantifier) {
			if (!(element in propertiesA.elements) || propertiesA.elements[element] === "") {
				propertiesA.elements[element] = propertiesB.elements[element];
			} else {
				// propertiesA.elements[element] !== "", so keep it
			}
		});
		attributesMerge(propertiesA.attributes, propertiesB.attributes);

		arrayMerge(propertiesA.choiceRefs, propertiesB.choiceRefs);
		arrayMerge(propertiesA.choices, propertiesB.choices, function (a, b) {
			// TODO: if this fails, should check again if a equals b using
			//       guaranteed deterministic alternative to JSON.stringify
			return JSON.stringify(a) === JSON.stringify(b);
		});

		if (propertiesA.choices.length > 8) {
			debugger;
		}
		arrayMerge(propertiesA.refs, propertiesB.refs);

		$.each(propertiesB.refQuantifiers, function (ref, quantifier) {
			if (!(ref in propertiesA.refQuantifiers) || propertiesA.refQuantifiers[ref] === "") {
				propertiesA.refQuantifiers[ref] = quantifier;
			}
		});

		arrayMerge(propertiesA.attributeValues, propertiesB.attributeValues, attributeValueEquality);

		propertiesA.textNode = propertiesA.textNode | propertiesB.textNode;
		propertiesA.list = propertiesA.list | propertiesB.list;
		
		if (propertiesA.documentation !== "") {
			documentation.push(propertiesA.documentation);
		}
		if (propertiesB.documentation !== "") {
			documentation.push(propertiesB.documentation);
		}

		propertiesA.documentation = documentation.join("\n");
	}