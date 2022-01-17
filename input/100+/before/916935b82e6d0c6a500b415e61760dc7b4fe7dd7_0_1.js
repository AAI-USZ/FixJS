function(req, res) {
    async.parallel([
	function(cb){
	    EventModel.find({"event": "checkWord"}, function(err, docs) {
		var wordviews = docs.length;
		cb(null, {"Word views": wordviews});
	    });
	},
	function(cb){
	    EventModel.find({"event": "addWord"}, function(err, docs) {
		var wordviews = docs.length;
		cb(null, {"Words added": wordviews});
	    });
	}
    ],
		   function(err, results) {
		       var out = '<html><head><title>Metrics</title></head><body>';
		       for (i in results) {
			   for (resname in results[i]) {
			       out += "<strong>" + resname + ":</strong> " + results[i][resname] + "<br>";
			   }
		       }
		       out += "</body><html>"
		       res.send(out);
		   });
}