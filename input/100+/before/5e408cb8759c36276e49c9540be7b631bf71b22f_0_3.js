function(/* var_args */) {

				var eventContext = createEventContext(controller, arguments);

				var event = eventContext.event;

				// Firefox

				if (event.originalEvent && event.originalEvent.detail) {

					event.wheelDelta = -event.detail * 40;

				}

				func.call(controller, eventContext);

			}