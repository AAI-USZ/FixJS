function(dbName, callback){
	var mysql   = require("mysql").createClient({
		host: config.mysqlDatabase["host"],
		user: config.mysqlDatabase["user"],
		password: config.mysqlDatabase["password"],
		port: config.mysqlDatabase["port"]
	});

	mysql.query('CREATE DATABASE IF NOT EXISTS ' + dbName + ' CHARACTER SET \'utf8\''
		, function(err){
		if(err){
			callback(0);
			console.log("Unable to create db " + err);
			return;
		}
		//Database created succesfully, create tables now
		else{
			console.log("Database created! Creating tables...\n");
			mysql.end();
			User.sync().success(function(){
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
			})
		}
	});
}