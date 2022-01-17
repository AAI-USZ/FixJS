function(data, textStatus, jqXHR)
		{
			//check for error 
			if(data[0] == AJAX_ERROR)
				{
					//call the error callback, if it exists
					if($.isFunction(args.error))
						args.error(jqXHR, data[1], 'ServerError');
					else
						console.error('AJAX Error: ' + data[1]);
				}
				else
					if($.isFunction(s_fn)) s_fn(data[1]);
		}