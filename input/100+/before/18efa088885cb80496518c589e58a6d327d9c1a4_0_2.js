function (param_uuid, param_cb) {
		//returns all results associated with the uuid parameter
		if(this.openLogSaves === 0) {
			this.db.collection('suites', function(err, collection){
				if(err) {
					param_cb(err,null);
				}
				var cursor = collection.find({uuid:param_uuid});
				var results = [];
				cursor.each(function(err,doc){
					if(doc) {
						if(doc.timeoutOccured) {

						} else {
							results.push(doc);
						}
					} else {
						param_cb(err,results);
					}
				});
				/*cursor.each(function(err, result){
					param_cb(err,result);
				});*/
			});
		} else {
			var that = this;
			//insert pending, wait 100ms and try again
			setTimeout(function(){
				that.get(param_uuid, param_cb);
			}, 100);
		}
	}