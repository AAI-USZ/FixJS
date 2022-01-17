function(msg, cb) 
	{
		this.sock.send(msg);
		if (cb)	this.onmessage = cb;
	}