function(tag){		
		var QuestionTag = require('./user.js').User;
		QuestionTag.find({where: {uuid: tag.user_uid}}).success(function(questionTag){
			callback(null, questionTag);
		}).error(function(error){
			callback(error, null);
		});
	}