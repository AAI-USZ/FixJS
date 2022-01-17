function()
	{
		var data;
		var args = argHashToArray(arguments);
		var callback = args.pop();
		args.unshift(command);
		if (sendsData)
		{
			data = args.pop();
			args.push(data.length);
		}
	
		this.send.apply(this, args);
		if (data) this.send(data);
		
		this.handlers.push([new ResponseHandler(expectedResponse), callback]);
	}