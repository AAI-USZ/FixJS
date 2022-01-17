function(args, update_fn)
	{
		//set sensible default arguments

		if(update_fn!=undefined)
		{
			args.xhr = function() {return makeUpdateXHR(update_function);};
		}

		$.ajax(args);
	}