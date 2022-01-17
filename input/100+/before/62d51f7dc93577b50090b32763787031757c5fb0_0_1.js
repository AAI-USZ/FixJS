function() {
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