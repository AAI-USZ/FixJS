function(newObj, callback)
{
	console.log(newObj.lat, newObj.lng)
	DBM.users.findOne({ip:newObj.ip}, function(e, oldObj){
		if (oldObj == null){
			DBM.users.insert(newObj, callback(newObj));
		}	else{
			oldObj.isp		= newObj.isp;
			oldObj.status 	= newObj.status;
			oldObj.lat		= newObj.lat;
			oldObj.lng		= newObj.lng;
			oldObj.time	 	= Date.now()
			DBM.users.save(oldObj); callback(oldObj);
		}
	});
}