function(){
					console.log("course user");
					Notification.sync().success(function(){
						console.log("notification user");
						CourseMember.sync().success(function(){
							console.log("coursememeber user");
							UserNotification.sync().success(function(){
								if(callback){
									callback();
								}
							});
						});
					});
				}