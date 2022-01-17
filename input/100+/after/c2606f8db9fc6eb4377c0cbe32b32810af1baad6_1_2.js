function (find, value, callback) {
	var self = this;
	this.db.open( function (error, client) {
		if (error) throw error;
		collection = new mongodb.Collection(client, 'user');
// with findandmodify we get back the modify object
		collection.findAndModify(find, [['_id', 'asc']], {$set: value}, {new:true}, function (err, objects) {
				if (err) {
					utils.quicklog(err.message);
				} else {
					callback(objects);
				}
				self.serverMongo.close();
		});
	});
}