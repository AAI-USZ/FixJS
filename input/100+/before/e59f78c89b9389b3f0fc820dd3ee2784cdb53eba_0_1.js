function render(/* contents, data, ..., deferred */) {
			var self = this;
			var $element = self[$ELEMENT];
			var arg = arguments;

			// Shift contents from first argument
			var contents = SHIFT.call(arg);

			// Assume deferred is the last argument
			var deferred = arg[arg.length];

			// If deferred not a true Deferred, make it so
			if (deferred === UNDEFINED || !(deferred[THEN] instanceof FUNCTION)) {
				deferred = Deferred();
			}

			// Defer render (as weaving it may need to load async)
			Deferred(function deferredRender(dfdRender) {

				// After render is complete, trigger REFRESH with woven components. Add this here to make sure it's the first done hadler
				dfdRender.done(function renderDone() {
					$element.trigger(REFRESH, arguments);
				});

				// Link deferred
				dfdRender.then(deferred.resolve, deferred.reject, deferred.notify);

				// Notify that we're about to render
				dfdRender.notify([ "beforeRender" ]);

				// Call render with contents (or result of contents if it's a function)
				$fn.call($element, contents instanceof FUNCTION ? contents.apply(self, arg) : contents);

				// Notify that we're rendered
				dfdRender.notify([ "afterRender" ]);

				// Weave element
				$element.find(ATTR_WEAVE).weave(dfdRender);
			});

			return self;
		}