function(child, parent) {
			console.debug("WARNING: Attempting to layout element that has been destroyed.\n\t Removing the element from the parent.\n\t The parent has a widget ID of " + parent.widgetId + ".");
			var children = parent.children;
			children.splice(children.indexOf(child),1);
		}