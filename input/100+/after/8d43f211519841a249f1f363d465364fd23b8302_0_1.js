function(req, res, next) {
		//If req.assetFingerprint is already there, do nothing.
		if(req.assetFingerprint)
			return next();
		//Helper function that adds fingerprints and returns them
		function addFingerprint(fingerprint, headers) {
			fingerprints[fingerprint] = headers;
			return fingerprint;
		}
		//Create req.assetFingerprint
		req.assetFingerprint = assetFingerprint;
		//Expose req.assetFingerprint in Express helper
		res.locals.assetFingerprint = function() {
			assetFingerprint.apply(req, arguments);
		};
		//Also, proxy res.end
		var end = res.end;
		res.end = function() {
			//If this request matches a fingerprint
			var info = fingerprints[req.url];
			if(info)
				//then set appropriate headers
				for(var i in info)
					res.setHeader(i, info[i]);
			//Put everything back
			res.end = end;
			res.end.apply(this, arguments);
		};
		next();
	}