function onInitialize(signal, deferred) {
			var self = this;

			// Store ref to current $element
			var $element = self[_$ELEMENT] = self[$ELEMENT];

			// Set $element to iframe document element
			self[$ELEMENT] = $($element.get(0).contentDocument);

			if (deferred) {
				deferred.resolve();
			}
		}