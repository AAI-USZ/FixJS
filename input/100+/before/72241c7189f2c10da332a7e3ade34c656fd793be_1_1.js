function(data, appType, callback){
	var document;
	var commentUuid = UUID.generate();
	var self = this;
	var args = {
		target:data.target_uuid
		,app:appType
		,user:data.user
		,description:'Yo dawg, i heard you like comments'	//TODO:need meaningful description
	};

	switchIndex(appType);
	switchMapping(1);

	document = mapping.document(commentUuid);
	data.timestamp = new Date().toISOString();
	data.created = data.timestamp;

	self.updateStatus(args.target, appType, function(err, updateResult){
		if(err)
			return callback(err);

		document.set(data, function(err, req, esData){
			if(err)
				return callback(err);
				console.log("document added");

				notification.addCommentUserNotification(args, function(err, usrNotificationResult){
					if(err){
						console.log(err);
						return callback(err);
					}

					delete args.description;
					notification.addCommentNotifier(args, function(err, result){
						if(err){
							console.log(err);
							callback(err);
						}

						console.log('complete');

						callback(null, esData);
					});
				});


			//callback(null, esData);
		});

	});
}