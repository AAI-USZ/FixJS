function() {
				log.debug(' + Authed', me.logAuthor);
				if (! me.connected){
					me.connected = true;
					me.transport_up();
					me.fireEvent('transport_up', this);
				}

				//me.subscribe('ui', 'events', me.on_event);
			}