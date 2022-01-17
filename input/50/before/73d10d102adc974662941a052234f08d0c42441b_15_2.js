function (i, choice) {
			var attributeName;
			for (attributeName in choice) {
				// already mostly simplified, just need to dereference the attr. values
				simplifyAttributeValues(choice, attributeName);
			}
		}