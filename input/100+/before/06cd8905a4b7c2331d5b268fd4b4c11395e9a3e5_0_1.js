function(cssSelector, callback){
	var self = this;

	self.element("css selector", cssSelector, function(result){
		if(result.status == 0){
			self.elementIdDisplayed(result.value.ELEMENT, function(result){
				if(result.value === false) callback(new Error('Element ' + cssSelector + ' was not visible'));
				if (typeof callback === "function"){
					callback(null, result);
				}
			});
		}else{
			callback(new Error('Element ' + cssSelector + ' was not available'));
		}
	});
}