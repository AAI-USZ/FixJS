function(args, update_fn)
	{
		//set sensible default arguments
		console.log('ajax_request()');

		if(update_fn!=undefined)
		{
			args.xhr = function() {return makeUpdateXHR(update_function);};
		}

		//replace the success function with my own
		var s_fn = args.success;
		args.success = function(data, textStatus, jqXHR)
		{
			console.log('args.success');
			//check for error 
			if(data[0] == AJAX_ERROR)
				{
					//call the error callback, if it exists
					if(args.error!=undefined)
						args.error(data[1]);
					else
						console.error('AJAX Error: ' + data[1]);
				}
				else
					s_fn(data[1]);
		}

		console.log('$.ajax(args);');
		$.ajax(args);
	}