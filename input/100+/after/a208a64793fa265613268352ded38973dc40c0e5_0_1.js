function unweave(deferred) {
		var unwoven = [];
		var i = 0;
		var $elements = $(this);

		deferred = deferred || $.Deferred();

		$elements
			// Reduce to only elements that are woven
			.filter(SELECTOR_WOVEN)
			// Iterate
			.each(function elementIterator(index, element) {
				var $element = $(element);
				var widgets = $element.data(WOVEN);
				var widget;

				$element
					// Remove WOVEN data
					.removeData(WOVEN)
					// Remove DATA_WOVEN attribute
					.removeAttr(DATA_WOVEN);

				// Somewhat safe(r) iterator over widgets
				while (widget = widgets.shift()) {
					// $.Deferred stop
					$.Deferred(function deferredStop(dfdStop) {
						// Store on onwoven
						unwoven[i++] = dfdStop;

						widget.stop(dfdStop);
					});
				}

				$element
					// Copy woven data to data-weave attribute
					.attr(DATA_WEAVE, $element.data(WEAVE))
					// Remove data fore WEAVE
					.removeData(WEAVE)
					// Make sure to clean the destroy event handler
					.unbind(DESTROY, onDestroy);
			});

		if (deferred) {
			// When all deferred are resolved, resolve original deferred
			$WHEN.apply($, unwoven).then(deferred.resolve, deferred.reject, deferred.notify);
		}

		return $elements;
	}