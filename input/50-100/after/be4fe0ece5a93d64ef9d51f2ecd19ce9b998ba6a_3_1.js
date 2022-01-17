function (change) {
		if (change.type === "Checkpoint") return false;

		// Don't send changes to calculated properties since they can be reproduced at any point when accessed.
		if (change.type === "ListChange" || change.type === "ReferenceChange" || change.type === "ValueChange") {
			var jstype = ExoWeb.Model.Model.getJsType(change.instance.type, true);
			if (jstype && LazyLoader.isLoaded(jstype.meta) && jstype.meta.property(change.property).get_isCalculated()) {
				return false;
			}
		}

		return true;
	}