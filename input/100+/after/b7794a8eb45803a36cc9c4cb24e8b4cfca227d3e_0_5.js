function()
	{
		var data, encoding;
		var args = argHashToArray(arguments);
		var callback = args.pop();
		args.unshift(command);
		if (sendsData)
		{
			data = args.pop();
			args.push(data.length);
		}

		this.send.apply(this, args);
		if (data)
		{
			encoding = (typeof data === 'string') ? 'utf8' : 'binary';
			this.stream.write(data, encoding);
			this.stream.write('\r\n');
		}

		this.handlers.push([new ResponseHandler(expectedResponse), callback]);
	}