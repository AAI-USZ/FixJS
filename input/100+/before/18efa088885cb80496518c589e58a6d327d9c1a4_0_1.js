function(err, collection) {
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
			}