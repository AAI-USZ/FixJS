function() {

		//Debug
		/*var event1_raw = {'id': 'collectd.collectd2event.check.resource.wpain-laptop.canopsis_mongodb1', 'output': 'aaa aa  aaaaa aa aa  aaa fff  ff f  ffffffff zedzedzaedazedazedazedazedazedazedazedaze zeadazed aezdazed aezdazed azedazed azedazedazd', 'connector': 'collectd', 'domain': null, 'resource':  parseInt(new Date().getTime() / 1000), 'event_type': 'check', 'timestamp': 1338558740, 'component': 'wpain-laptop', 'state_type': 1, 'source_type': 'resource', 'state': 0, 'connector_name': 'collectd2event', 'address': null, 'perf_data_array': [{'min': null, 'max': null, 'metric': 'files_size', 'value': 0, 'type': 'GAUGE', 'unit': null}], 'perf_data': null}
		var event = Ext.create('widgets.stream.event', {raw: event1_raw, stream: this})
		this.add_events([event])
		*/

		// Get history
		/*var filter = '{"event_type": {"$ne": "comment"}}'
		if (this.hard_state_only)
			filter = '{ "$and": [{"state_type": 1 }, '+filter+']}'
		*/

		// Load history
		var me = this;
		if (now) {
			if (global.websocketCtrl.connected){
				now.stream_getHistory(this.max, function(records) {
					log.debug('Load '+ records.length + ' events', me.logAuthor);
					if (records.length > 0) {
						for (var i in records)
								records[i] = Ext.create('widgets.stream.event', {id: me.get_event_id(records[i]), raw: records[i], stream: me});

						me.add_events(records);
					}

					if (! me.reportMode)
						me.subscribe();

					me.ready();
				});
			}
		}else {
			log.error("'now' is undefined, websocket down ?", me.logAuthor);
		}

	}