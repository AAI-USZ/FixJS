function() {
				log.debug(' + Authed', me.logAuthor);

				me.connected = true;
				me.transport_up();

				//me.subscribe('ui', 'events', me.on_event);
			}