function(service, method, request, response, next){
	if(!services[service])
		if(next)
			next();
		else{
			util.sendServiceResponse(response, 'Service Not found', {});
			return;
		}
	else{
		var caller = services[service].service[method];
		if(!caller)
			if(next)
				next();
			else{
				util.sendServiceResponse(response, 'Service Not found', {});
				return;
			}
			//for (caller in services[service].service) break;
		else{
			if(typeof caller == 'string')
				caller = services[service].service[caller];
			
			if(caller){
				logger.debug('Simple Portal -services', 'Request for service - '+ service + ' method - '+ method +' -- is made');
				
				caller(request, response, function(error, results){
					util.sendServiceResponse(response, error, results);
				});
			}else
				util.sendServiceResponse(response, 'Service Not found', {});
		}
	}
}