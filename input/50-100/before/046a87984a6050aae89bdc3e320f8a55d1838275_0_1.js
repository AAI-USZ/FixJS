function(err, venue){
			if (!err) {
				if (venue==null) {
					res.send(500, 'The specified venue does not seem to exist');
				}else{
					event.save(function(err){
						if (err) {
							res.send(err);
						} else{
							res.send(req.url+'/'+event._id);
						}
					});
				}
			}else{
				res.send(err);
			}
		}