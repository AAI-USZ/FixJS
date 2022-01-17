function(args, update_fn)
	{
		//Calling without an update_fn is pointless -- you should use get or post
		//above
		if(update_fn==undefined)
		{
			console.error('AJAX.stream: called without update function');
		}

		ajax_request(args, update_fn);
	}