function(err, venue){
			if (!err) {
				if (venue==null) {
					res.send(404, 'The specified venue has not been found');
				}else{
					event.save(function(err){
						if (err) {
							res.send(500, 'Error #302: '+err);
						} else{
							res.send(req.url+'/'+event._id);
						}
					});
				}
			}else{
				res.send(500, 'Error #303: '+err);
			}
		}