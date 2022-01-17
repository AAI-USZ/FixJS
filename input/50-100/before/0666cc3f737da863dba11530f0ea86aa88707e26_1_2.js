function(logs) {
			if (logs.data !== null) {
				that.callback(logs);
				that.updateCursor(logs.to);
			} else {
				// console.log("Empty log result");
			}

			that.timer = setTimeout($.proxy(that.getLogs, that), 1000);

		}