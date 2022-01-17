function(type, url, data, success_fn, fail_fn, async, update_fn)
	{
		//set sensible default arguments
		//default to a POST request
		if(type==undefined) type='POST';

		//default to asynchronous
		if(async==undefined) async = true;
		
		//default to the current URL
		if(url==undefined) url = document.URL;

		//make ajax request
		var args = {
			url: url,
			data: data,
			success: success_fn,
			error: fail_fn,
			async: async,
		}

		if(update_fn!=undefined)
		{
			args.xhr = function() {return makeUpdateXHR(update_function);};
		}

		$.ajax(args);

	}