function (param_logMessage, param_cb) {
		var that = this;
		if(this.db) {
			console.log('log: ' + param_logMessage);
			this.db.createCollection('suites', function(err, collection) {
				if(!err){
					collection.insert(param_logMessage, {safe:true}, function(err, result){
						that.openLogSaves--;
						if(!err) {
							if (param_cb) {
								param_cb(null, result);
							}
						} else {
							if (param_cb) {
								param_cb('Logger: Insertion failed', null);
							}
						}
					});
				} else {
					if(param_cb) {
						param_cb(err,null);
					}
				}
			});
		} else { //db connection is not open yet
			var that = this;
			//insert pending, wait 500ms and try again, if db not up -> log to console
			var dbTimeout = setTimeout(function () {
				if(!that.db) {
					that.consoleOutput = true;
				} else {
					console.log('waited 500');
					that._reLog(param_logMessage, param_cb);
				}
			}, 500);
		}
	}