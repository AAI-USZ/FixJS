function onEvent(event)
	{
		if(!this.running)
		{
			console.warn(this.name+" has terminated and cannot process more events")
			return
		}
		this.externalQueue.push(event)
		if(this.stable)
			this.extEventLoop()
	}