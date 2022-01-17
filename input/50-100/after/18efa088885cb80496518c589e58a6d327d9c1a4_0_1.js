function(err, collection){
				if(err) {
					param_cb(err,null);
				} else {
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
				}
			}