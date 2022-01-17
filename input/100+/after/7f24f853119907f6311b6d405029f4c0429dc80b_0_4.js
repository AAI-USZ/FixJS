function(){

		var title = "\n  PREY " + common.version + " spreads its wings!";
		logger.write(title, 'light_red');
		logger.write("  Current time: " + this.started_at.toString(), 'bold');

		var info = "  Running with PID " + process.pid + " on a " + common.os_name;
		info += " system as " + this.running_as + "\n";
		info += "  Detected logged user: " + process.env.LOGGED_USER + "\n";
		info += "  NodeJS version: " + process.version + "\n";

		logger.write(info);

	}