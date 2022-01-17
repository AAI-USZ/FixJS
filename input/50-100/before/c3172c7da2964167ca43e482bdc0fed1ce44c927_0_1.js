function(err, results) {
		       var out = '<html><head><title>Metrics</title></head><body>';
		       for (i in results) {
			   for (resname in results[i]) {
			       out += "<strong>" + resname + ":</strong> " + results[i][resname] + "<br>";
			   }
		       }
		       out += "</body><html>"
		       res.send(out);
		   }