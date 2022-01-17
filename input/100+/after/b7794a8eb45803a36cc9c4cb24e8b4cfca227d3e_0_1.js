function(callback)
{
	var self = this, tmp;

	self.stream = net.createConnection(self.port, self.host);

	self.stream.on('data', function(data)
	{
		if (!self.buffer)
			self.buffer = data;
		else
		{
			tmp = new Buffer(self.buffer.length + data.length);
			self.buffer.copy(tmp, 0);
			data.copy(tmp, self.buffer.length);
			self.buffer = tmp;
		}
		return self.tryHandlingResponse();
	});
	self.stream.on('connect', function()
	{
		callback(null);
	});
	self.stream.on('error', function(err)
	{
		callback(err);
	});
	self.stream.on('close', function(err)
	{
		callback(err);
	});
}