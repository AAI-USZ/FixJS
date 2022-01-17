function (error, client) {
		if (error) throw error;
		collection = new mongodb.Collection(client, 'user');
// with findandmodify we get back the modify object
		collection.findAndModify({name: value.name}, [['_id', 'asc']], {$set: {
			email: value.email, 
			password: value.password
			} }, {new:true}, function (err, objects) {
				if (err) {
					utils.quicklog(err.message);
				} else {
					callback(objects);
				}
				self.serverMongo.close();
		});
	}