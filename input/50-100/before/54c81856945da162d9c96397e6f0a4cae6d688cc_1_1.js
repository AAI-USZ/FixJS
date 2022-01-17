function(prop) {
			if (!entityClass[prop.name.toLowerCase()]) {
				alert("cannot instance entity of type '" + prop.name
						+ "': Class not found!");
				return null;
			}
			// i should pass the entity ownProperty instead of the object itself
			return new entityClass[prop.name.toLowerCase()](prop.x, prop.y, prop);
		}