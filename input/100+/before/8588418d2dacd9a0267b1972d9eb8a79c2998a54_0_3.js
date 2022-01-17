function setArrayChangeLink(view) {
		if (view.isArray) {
			var handler,
				data = view.data,
				onArrayChange = view._onArrayChange;

			if (onArrayChange) {
				// First remove the current handler if there is one
				$([onArrayChange[1]]).off(arrayChangeStr, onArrayChange[0]);
				view.onArrayChange = undefined;
			}

			if (data) {
				// If this view is not being removed, but the data array has been replaced, then bind to the new data array
				handler = function() {
					arrayChangeHandler.apply(view, arguments);
				};
				$([data]).on(arrayChangeStr, handler);
				view._onArrayChange = [handler, data];
			}
		}
	}