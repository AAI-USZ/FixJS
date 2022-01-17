function(callback) {
	var self = exports;
	var config = {
		database: MONGODB,
		//user:
		//pass:
		//host:
		//port:
	};
	mongoConnect.connect(config, function (dbclient) {
		client = dbclient;
		if(numberOfTestsRun == 0) {
			// If first test drop the db
			client.dropDatabase(function(err, done) {
				begin(callback);
			});
		} else {
			begin(callback);
		}
	});
}