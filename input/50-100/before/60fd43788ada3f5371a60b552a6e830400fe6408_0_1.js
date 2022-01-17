function(nick, callback) {
	    var toInsert = {'nickname': nick};
	    db.open(function(err, client) { 
		client.createCollection('games', function(err, col) {
		    client.collection('games', function(err, col) {
			col.insert(toInsert, {safe:true}, function() { callback(toInsert._id); });
		    });
		});
	    });
	}