function(error, result){
				if (error){
					res.send(500);
				} else {
					console.log(result);
					if (result) {
						result.password = undefined;
						
						req.session.authentication = 'done';
						req.session.userId = result._id;
						req.session.save();
						
						res.send(result);
						console.log('authenticated...');
					} else {
						connectUtils.unauthorized(res);
					}
				}
		}