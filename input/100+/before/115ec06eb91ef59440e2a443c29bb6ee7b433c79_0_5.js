function (state,rec)
	{
		if(!(state.tagName in SCxml.STATE_ELEMENTS))
			throw state +" is not a state element."
		// spec says we MUST generate an id for states that have none
		if(!state.hasAttribute('id'))
			state.setAttribute('id', this.uniqId())

		var id=state.getAttribute('id')
		if(id in this.configuration) return
		this.configuration[id]=(state)
		
		// first add ancestors to the configuration
		if(state.parentNode.tagName != "scxml")
			this.enterState(state.parentNode,true)
				
		// now add this one
		var onentry=this.dom.querySelectorAll("#"+id+" > onentry")
		for(var i=0; i<onentry.length; i++)
			try{this.execute(onentry[i])}
			catch(err){continue}
		
		switch(state.tagName)
		{
		case "parallel":
			var c=state.firstElementChild
			while(c) if(c.tagName in SCxml.STATE_ELEMENTS)
			{
				this.enterState(c,true)
				c=c.nextElementSibling
			}
			break
		case "final":
			if(state.parentNode==this.dom.documentElement)
			{
				this.running=false
				this.stable=true
				console.log(this.name+" reached top-level final state: Terminated.")
				SCxml.sessions[this.sid]=null
				return
			}
			else
				this.internalQueue.push(new SCxml.Event("done.state."
				+state.parentNode.getAttribute("id")))
		default:
			var first
			if(first = this.firstState(state))
				this.enterState(first,true)
		}

		if(!rec) this.mainEventLoop()
	}