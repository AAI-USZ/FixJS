function(tag){		
		var UserTag = require('./user.js').User;
		UserTag.find({where: {uuid: tag.user}}).success(function(userTag){
			callback(null, userTag);
		}).error(function(error){
			callback(error, null);
		});
	}