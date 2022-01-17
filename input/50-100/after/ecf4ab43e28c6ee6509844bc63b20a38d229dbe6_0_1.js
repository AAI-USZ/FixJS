function() {
		log.info('Transport Down', this.logAuthor);
		if (this.connected && global.notify)
			global.notify.notify(_('Error'), _('Disconnected from websocket.'), 'error');
		this.fireEvent('transport_down', this);
	}