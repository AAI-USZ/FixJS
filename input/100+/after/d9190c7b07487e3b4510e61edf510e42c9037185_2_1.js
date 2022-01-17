function(response, request_path, rendered_obj, file_extension){
		var self = this;

		// set the header status and content type
		// extend the header with given headers
		var options = rendered_obj.options || {};
		var header = options.header || {};
		var status_code = parseInt(header.status) || 200;

		header["Content-Length"] = (rendered_obj.body && rendered_obj.body.length || 0);
		header["Content-Type"] = header["Content-Type"] || mime.lookup(file_extension);

		if(rendered_obj.modified){
			// if the response is successful and has a body 
			if(status_code === 200 && rendered_obj.body.length){
				// cache the result
				self.cacheStore.update(request_path, file_extension, rendered_obj.body, function(err){
					return self.sendResponse(response, status_code, header, rendered_obj.body);
				});
			} else {
					self.getStatusPage(status_code, file_extension, header, function(err, status_obj){
						return self.sendResponse(response, status_code, status_obj.options.header, status_obj.body);
					});
			}
		} else {
			self.cacheStore.get(request_path, file_extension, header, function(err, cache_obj){
				return self.sendResponse(response, status_code, cache_obj.options.header, cache_obj.body);
			});
		}
	}