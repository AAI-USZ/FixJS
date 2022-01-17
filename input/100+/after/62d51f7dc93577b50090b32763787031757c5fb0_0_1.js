function() {
		if (! global.websocketCtrl.connected){
			log.error('Impossible to publish, not connected.', this.logAuthor);
			global.notify.notify(_('Error'), _('Impossible to publish, your are not connected to websocket. Check service or firewall')+" (port: "+global.nowjs.port+")", 'error');
			return
		}
		
		var toolbar = 0;

		if (this.title)
			toolbar = this.getDockedItems()[1];
		else
			toolbar = this.getDockedItems()[0];

		var message = toolbar.getComponent(this.id + '-message').getValue();
		toolbar.getComponent(this.id + '-message').reset();

		var state = toolbar.getComponent(this.id + '-state').getValue();

		var event_raw = {
				'connector_name': 'widget-stream',
				'source_type': 'component',
				'event_type': 'user',
				'component': global.account.id,
				'output': message,
				'author': global.account.firstname + ' ' + global.account.lastname,
				'state': state,
				'state_type': 1
			};

		global.websocketCtrl.publish('amqp', 'events', event_raw);
	}