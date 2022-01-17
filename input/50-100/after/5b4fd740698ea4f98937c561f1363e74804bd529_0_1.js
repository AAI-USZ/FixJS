function deferredRender(dfdRender) {

				// Link deferred
				dfdRender.then(function renderDone() {
					// Trigger refresh
					$element.trigger(REFRESH, arguments);

					// Resolve outer deferred
					deferred.resolve();
				}, deferred.reject, deferred.notify);

				// Notify that we're about to render
				dfdRender.notify("beforeRender", self);

				// Call render with contents (or result of contents if it's a function)
				$fn.call($element, contents instanceof FUNCTION ? contents.apply(self, arg) : contents);

				// Notify that we're rendered
				dfdRender.notify("afterRender", self);

				// Weave element
				$element.find(ATTR_WEAVE).weave(dfdRender);
			}