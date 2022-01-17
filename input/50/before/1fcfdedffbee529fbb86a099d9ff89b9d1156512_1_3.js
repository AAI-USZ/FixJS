function(url, data, success_fn, update_fn, fail_fn, type)
	{
		//Calling without an update_fn is pointless -- you should use get or post
		//above
		if(update_fn==undefined)
		{
			console.error('AJAX.stream: called without update function');
		}

		ajax_request(type, url, data, success_fn, fail_fn, async, update_fn);
	}