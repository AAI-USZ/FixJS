function() {
		log.info('Transport Down', this.logAuthor);
		global.notify.notify(_('Error'), _('Disconnected from websocket.'), 'error');
		this.fireEvent('transport_down', this);
	}