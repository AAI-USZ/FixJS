function(err, req, esData){
				if (esData) {
/*Alex's stuff
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
									callback(esData);
								}else{
									callback(undefined);
								}
							});
						}else{
							callback(undefined);
						}
					});
 */
					callback(null, esData);
				}else {
					callback(err);
				}
			}