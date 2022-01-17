function(data, textStatus,jqXHR){
		var self = this;

		return $.Deferred(function(dfd){

			if(typeof data === 'object'){
				for(var key in data){
					self.set(key,data[key]);
				}
			}

			//trigger a populate event
			self.trigger('populate');
			dfd.resolve();
		}).promise();
		
	}