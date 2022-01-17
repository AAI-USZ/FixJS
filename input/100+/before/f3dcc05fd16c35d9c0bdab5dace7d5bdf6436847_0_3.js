function()
	{
		// first try eventless transition
		var trans=this.selectTransitions()
		for(t in trans) if(!trans[t].hasAttribute("cond")
		|| this.expr(trans[t].getAttribute("cond")))
			return this.takeTransition(trans[t])
		
		// if none is enabled, consume internal events
		var event
		while(event=this.internalQueue.shift())
		{
			trans=this.selectTransitions(event)
			for(t in trans) if(!trans[t].hasAttribute("cond")
			|| this.expr(trans[t].getAttribute("cond")))
				return this.takeTransition(trans[t])
		}
		
		// if we reach here, no transition could be used
		console.log(this.name+": macrostep completed.")
		this.stable=true
	}