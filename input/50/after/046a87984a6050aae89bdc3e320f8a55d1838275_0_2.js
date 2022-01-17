function(err){
						if (err) {
							res.send(500, 'Error #302: '+err);
						} else{
							res.send(req.url+'/'+event._id);
						}
					}