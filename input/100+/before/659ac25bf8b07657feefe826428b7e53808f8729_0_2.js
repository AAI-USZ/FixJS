function(err){
		if(err){
			console.log("Unable to create db " + err);
			return;
		}
		//Database created succesfully, create tables now
		else{
			console.log("Database created! Creating tables...\n");
			mysql.end();
			console.log("now loading models");
			User.sync().success(function(){
				console.log("loaded user");
				Course.sync().success(function(){
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
				});
			}).error(function(error) {
  				console.log("[ERROR] "+error);
			});
		}
	}