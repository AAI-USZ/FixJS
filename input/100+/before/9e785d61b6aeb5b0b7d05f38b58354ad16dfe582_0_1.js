function(records) {
				log.debug('Load '+ records.length + ' events', me.logAuthor);
				if (records.length > 0) {
					for (var i in records)
							records[i] = Ext.create('widgets.stream.event', {id: me.get_event_id(records[i]), raw: records[i], stream: me});

					me.add_events(records);
				}

				if (! me.reportMode)
					me.subscribe();

				me.ready();
			}