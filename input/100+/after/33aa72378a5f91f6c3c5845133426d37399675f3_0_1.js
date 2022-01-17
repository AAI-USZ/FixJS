function(event_id, raw, message, orievent) {
		if (! global.websocketCtrl.connected){
			log.error('Impossible to publish, not connected.', this.logAuthor);
			global.notify.notify(_('Error'), _('Impossible to publish, your are not connected to websocket. Check service or firewall')+" (port: "+global.nowjs.port+")", 'error');
			return
		}
		
		log.debug(event_id + ' -> '+ message, this.logAuthor);

		var event_raw = {
				'connector_name': 'widget-stream',
				'source_type': raw.source_type,
				'event_type': 'comment',
				'component': raw.component,
				'resource': raw.resource,
				'output': message,
				'referer': event_id,
				'author': global.account.firstname + ' ' + global.account.lastname,
				'state': 0,
				'state_type': 1
			};

		global.websocketCtrl.publish('amqp', 'events', event_raw);
	}