function() {
			// remove attached events from an element
			var events = this.element.retrieve('sttachedEvents');
			events && this.element.removeEvents(events).eliminate('attachedEvents');

			return this;
		}