function createComponents(componentsToCreate, spec) {
			// Process/create each item in scope and resolve its
			// promise when completed.
			for (var name in componentsToCreate) {
				createScopeItem(name, spec[name], components[name]);
			}
		}