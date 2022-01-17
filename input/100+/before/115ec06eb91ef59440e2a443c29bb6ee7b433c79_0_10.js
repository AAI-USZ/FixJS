function()
	{
		this.stable=false
		// consume external events
		var event
		while(event=this.externalQueue.shift())
		{
			this.datamodel._event=event
			trans=this.selectTransitions(event)
			for(t in trans) try{
				if(!trans[t].hasAttribute("cond")
				|| this.expr(trans[t].getAttribute("cond")))
					return this.takeTransition(trans[t])
			} catch(err) {continue}
		}
		
		// if we reach here, no transition could be used
		this.stable=true
		console.log(this.name+": waiting for external events.")
	}