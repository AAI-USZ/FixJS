function(data)
	{
		self.buffer += data;
		return self.tryHandlingResponse();
	}