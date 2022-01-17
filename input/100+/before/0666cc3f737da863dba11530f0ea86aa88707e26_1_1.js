function() {

		// console.log("About to request logs from " + moment.unix(this.cursor).format('HH:mm:ss.SSS') + '  cursor in ms ' + this.cursor);

		var that = this;
		UWAP.logs.get(this.cursor, this.filters, function(logs) {
			if (logs.data !== null) {
				that.callback(logs);
				that.updateCursor(logs.to);
			} else {
				// console.log("Empty log result");
			}

			that.timer = setTimeout($.proxy(that.getLogs, that), 1000);

		}, function(err) {
			console.error("Error occured fetching logs. Stopping.");
		});
	}