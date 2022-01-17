function(err, orgResult){
						console.log('Added question resource to section');
						notification.createNewQuestion({app:appType, user:data.user, target:questionUuid}, function(err, result){
							if(result){
								console.log('Added question notification');
								callback(null, esResult);
							}else{
								callback(err);
							}
						});
					}