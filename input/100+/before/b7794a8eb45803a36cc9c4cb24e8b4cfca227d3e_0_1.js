function(callback)
{
	var self = this;

	self.stream = net.createConnection(self.port, self.host);
	
	self.stream.on('data', function(data)
	{
		self.buffer += data;
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