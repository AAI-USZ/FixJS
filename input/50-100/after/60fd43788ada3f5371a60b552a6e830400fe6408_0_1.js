function(nick, board, callback) {
	    var toInsert = {'nickname': nick, 'board':board};
	    db.open(function(err, client) { 
		client.createCollection('games', function(err, col) {
		    client.collection('games', function(err, col) {
			col.insert(toInsert, {safe:true}, function() { callback(toInsert._id); });
		    });
		});
	    });
	}