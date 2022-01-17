function(dataFile, dbName, dbUser, dbPassword, dbHost){
	
	var db = new Sequelize(
		dbName,	
		dbUser,	
		dbPassword,
		{
			host: dbHost
			, logging: false
			, define: {charset:'utf8'}
		}
	);
	
	var data  = JSON.parse(fs.readFileSync(dataFile));

	for(index in data.courses){
		var course = Course.create(data.courses[index]).success(function(course){
			course.save().error(function(error){
				console.log("Failed to insert course " + error);
			})
		})
	}
	for(index in data.users){
		var user = User.build(data.users[index]);

		user.save().error(function(error){
			console.log("Failed to insert user " + error);
		})
	}
	for(index in data.courseMembers){
		var member = CourseMember.build(data.courseMembers[index]);

		member.save().error(function(error){
			console.log("Failed to insert course member " + error);
		})
	}
	for(index in data.notification){
		var notification = Notification.build(data.notification[index]);

		notification.save().error(function(error){
			console.log("Failed to insert notification " + error);
		})
	}
	
	for(index in data.usernotification){
		var userNotification = UserNotification.build(data.usernotification[index]);

		userNotification.save().error(function(error){
			console.log("Failed to insert user notification " + error);
		})
	}
	
	for(index in data.usernotificationsettings){
		var userNotificationSettings = UserNotificationSettings.build(data.usernotificationsettings[index]);

		userNotificationSettings.save().error(function(error){
			console.log("Failed to insert user notification settings " + error);
		})
	}
}