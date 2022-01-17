function(cb){
	    EventModel.find({"event": "castVote"}, function(err, docs) {
		var votes = docs.length;
		cb(null, {"Votes cast": votes});
	    });
	}