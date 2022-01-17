function(){
				Course.sync().success(function(){
					Notification.sync().success(function(){
						CourseMember.sync().success(function(){
							UserNotification.sync().success(function(){
								UserNotificationSettings.sync().success(function(){
									if(callback){
										callback(1);
									}
								});
							});

						});
					});
				});
			}