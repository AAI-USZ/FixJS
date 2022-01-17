function installEventRuler(npt) {
                 	var events = $._data(npt).events;

					$.each(events, function(eventType, eventHandlers){
                         $(npt).bind(eventType + ".inputmask", function(event) {
                         							if (this.readOnly || this.disabled) {
                         							  event.stopPropagation();
                         							  event.stopImmediatePropagation();
                         							  event.preventDefault();
                         							  return false;
                         							}
                         						});
                         //!! the bound handlers are executed in the order they where bound
                         //reorder the events
                         var ourHandler = eventHandlers[eventHandlers.length - 1];
                         for (var i = eventHandlers.length - 1; i > 0; i--) {
                             eventHandlers[i] = eventHandlers[i - 1];
                         }
                         eventHandlers[0] = ourHandler;
                    });
				}