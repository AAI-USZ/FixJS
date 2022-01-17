function(err, req, esData){
				if (esData) {
/*
					var args = {
						target:data.target_uuid
						,app:appType
						,user:data.user
						,description:'Yo dawg, i heard you like comments'	//TODO:need meaningful description
					};
					notification.addCommentUserNotification(args, function(err, usrNotificationResult){
						if(usrNotificationResult){
							console.log("successfully added usr comment notification");

							delete args.description;
							notification.addCommentNotifier(args, function(err, result){
								if(result){
									console.log("successfully added comment notification");
									callback(null, esData);
								}else{
									callback(err);
								}
							});
						}else{
							callback(err);
						}
					});*/
					callback(null, esData); //remember to remove this when adding alex's notification
				}else {
					callback(err);
				}
			}