function(request, response, callback, options) {
	var instance = this;
	
	options = options||{};
	
	var object = instance.service.getObject(request);
    var id = instance.service.getObjectId(object);
    if(object.validationmessages && object.validationmessages.length > 0){
    	callback(object.validationmessages, object);
    } else if(id){
        object.id = id;
        var query = {};
        if(request.query && request.query.add_update)
        	query = {id:id};
        
        instance.service.getStorageService().add_update(query, object, callback, instance.beforeSave, options);
    }else
        callback('Id is mandatory to proceed..');
}