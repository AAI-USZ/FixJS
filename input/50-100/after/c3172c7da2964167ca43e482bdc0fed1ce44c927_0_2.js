function(err, results) {
                       if (!err) {
			   var out = '<html><head><title>Metrics</title></head><body>';
			   for (i in results) {
			       for (resname in results[i]) {
				   out += "<strong>" + resname + ":</strong> " + results[i][resname] + "<br>";
			       }
			   }
			   out += "</body><html>"
			   res.send(out);
		       } else {
			   res.send(err);
		       }
		   }