function (data) {
			// error() is a pre defined function to format the error and pause the stream
			self.pause()
			self.emit('error', error(err, data))
			// Initialize
			atok.clear(true).loadRuleSet('main')
		}