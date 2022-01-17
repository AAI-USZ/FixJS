function(data, textStatus, jqXHR)
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