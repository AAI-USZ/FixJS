function() {
				if (me.connected){
					me.connected = false;
					me.transport_down();
					me.fireEvent('transport_down', this);
				}
			}