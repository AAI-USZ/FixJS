function(err, result){
		if(err && typeof callback == 'function') return callback(err);
		self.elementIdDisplayed(result.value.ELEMENT, function(err, result){
			if(err && typeof callback == 'function') return callback(err);
			if (typeof callback === "function"){
				callback(null, result);
			}
		});
	}