function mainEventLoop()
	{
		// first try eventless transition
		var trans=this.selectTransitions()
		for(t in trans) try{
			if(!trans[t].hasAttribute("cond")
			|| this.expr(trans[t].getAttribute("cond"),trans[t]))
				return this.takeTransition(trans[t])
			} catch(err) {}
		
		// if none is enabled, consume internal events
		var event
		while(event=this.internalQueue.shift())
		{
			this.datamodel._event=event
			trans=this.selectTransitions(event)
			for(t in trans) try{
				if(!trans[t].hasAttribute("cond")
				|| this.expr(trans[t].getAttribute("cond"),trans[t]))
					return this.takeTransition(trans[t])
			} catch(err) {}
		}
		
		// if we reach here, no transition could be used
		this.stable=true
		this.extEventLoop()
	}