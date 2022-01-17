function(callback){

		this.running = true;
		this.running_as = process.env.RUNNING_USER = process.env.USER || process.env.USERNAME || 'System';
		this.started_at = new Date();

		logger.write("\n  PREY " + common.version + " spreads its wings!", 'light_red');
		logger.write("  Current time: " + this.started_at.toString(), 'bold')
		logger.write("  Running with PID " + process.pid + " on a " + common.os_name + " system as " + this.running_as);
		logger.write("  Detected logged user: " + process.env.LOGGED_USER);
		logger.write("  NodeJS version: " + process.version + "\n");

		// make sure the running interval is set correctly
		this.check_delay(60);

		// if any actions were requested through the command line
		if(program.actions)
			this.start_actions_by_name(program.actions.split(','));

		this.check_connection(function(connected){

			// only check for updates if enabled and run via trigger (usually on startup)
			if(self.interactive || !connected || !config.auto_update) return callback();

			self.check_for_update(function(err, new_version){

				if(err) self.log_error(err);
				if(!new_version) return callback();

				logger.notice("Updated to version " + new_version + "! Shutting down...");
				self.shutdown();

			});

		});

	}