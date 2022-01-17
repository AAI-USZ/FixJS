function(event_id, raw, message, orievent) {
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