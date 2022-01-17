function onEvent(event)
	{
		if(!this.running)
			throw this.name+" has terminated and cannot process more events"
		this.externalQueue.push(event)
		if(this.stable)
			this.extEventLoop()
	}