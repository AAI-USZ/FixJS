function() {
		log.info('Transport Down', this.logAuthor);
		if (global.notify)
			global.notify.notify(_('Error'), _('Disconnected from websocket.'), 'error');
	}