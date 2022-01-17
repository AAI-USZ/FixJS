function (param_logMessage, param_cb) {
		var that = this;
		if(this.db) {
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
			//insert pending, wait 100ms and try again
			setTimeout(function(){
				console.log('db not ready, waiting 100ms');
				that.log(param_logMessage, param_cb);
			}, 100);
		}
	}