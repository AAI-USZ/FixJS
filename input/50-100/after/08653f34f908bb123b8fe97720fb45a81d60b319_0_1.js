function onInitialize(signal, deferred) {
			var self = this;

			// Store ref to current $element
			var $element = self[_$ELEMENT] = self[$ELEMENT];

			// Get the contentWindow
			var contentWindow = $element.get(0).contentWindow;

			// Set $element to iframe document element
			self[$ELEMENT] = $(contentWindow.ownerDocument || contentWindow.document);

			if (deferred) {
				deferred.resolve();
			}
		}