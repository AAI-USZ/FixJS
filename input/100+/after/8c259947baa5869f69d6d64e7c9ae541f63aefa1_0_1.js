function filelogger(logpath) {
	var path = require('path');
	var exec = require('child_process').exec;
	if (!fs.existsSync(logpath)) {
		exec('mkdir -p ' + logpath, function(error, stdoutput, strerr) {
			{
			if(error)throw error;
			}
		});
	}
	;
	var filename = new Date().toDateString();
	this.logfile = logpath + filename;
	this.debug=function(msg,caller)
	{
		this.writeintoFile(new Date() + "debug in " + caller + " : " + msg
				+ '\n');
	};
	this.error=function(msg,caller)
	{
		this.writeintoFile(new Date() + "error in " + caller + " : " + msg
				+ '\n');
	};
	this.info=function(msg,caller)
	{
		this.writeintoFile(new Date() + "info in " + caller + " : " + msg
				+ '\n');
	};
	this.warn=function(msg,caller)
	{
		this.writeintoFile(new Date() + "warnning in " + caller + " : "
				+ msg + '\n');
	};
	this.writeintoFile=function(msg)
	{
		fs.open(this.logfile, 'a', function(error, fd) {
			if (error) {
				throw error;
			} else {
				fs.write(fd, msg, null, 'utf-8', function(err, written) {
					if (err)
						throw err;
					else {
						fs.close(fd, function(err) {
							if (err)
								throw err;
						});
					}
				});
			}
		});
	};

}