function() {
		log.info('Transport Up', this.logAuthor);
		if (global.notify)
			global.notify.notify(_('Success'), _('Connected to websocket'));

		//Re-open channel
		if (this.subscribe_cache && this.auto_resubscribe) {
			for (var i in this.subscribe_cache) {
				var s = this.subscribe_cache[i]
				delete this.subscribe_cache[i];

				for (var j in s.subscribers) {
					var t = s.subscribers[j];
					this.subscribe(s.type, s.channel, t.on_message, t.scope);
				}
			}
		}
	}