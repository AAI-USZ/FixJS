function(){
							UserNotification.sync().success(function(){
								if(callback){
									callback();
								}
							});
						}