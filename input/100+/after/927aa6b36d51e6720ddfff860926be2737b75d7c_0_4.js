function(query, object, callback, beforeSave, options){
	var instance = this;
	
	if(beforeSave){
		beforeSave(object, function(error, object){
			if(error)
				callback('Some problem while updating');
			else
				instance.add_update(query, object, callback, null, options);
		});
	} else{
		if(query && query.id){
			if (query.id) {
				if(query.id != object.id){
					instance.findOne({id: object.id}, function(err, objectFromDB) {
						if (!objectFromDB || objectFromDB == '') {
							instance.update({id: query.id}, object, callback, options);
						} else {
							callback({id:"A  record with id -" + object.id + " is already exists in our database. Please enter new values."});
						}
					}, options);
				}else
					instance.update({id: query.id}, object, callback, options);
			} else {
				callback({id:"Please enter the id-" + query.id + " for updating"});
			}
		} else{
			var id = object.id;
			if(id){
				instance.findOne({id: id}, function(err, objectFromDB) {
					if (!objectFromDB || objectFromDB == '') {
						instance.save(object, callback, options);
					} else {
						callback({id:"A  record with id -" + object.id + " is already exists in our database. Please enter new values."});
					}
				}, options);
			} else{
				callback({id:"The id is missing. Please enter new values."});
			}
		}
	}
}