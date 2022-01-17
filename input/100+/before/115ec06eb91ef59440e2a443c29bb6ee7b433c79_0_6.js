function (state, common)
	{
		if(!(state.tagName in SCxml.STATE_ELEMENTS))
			throw state +" is not a state element."
		
		common=common||this.dom.documentElement
		if(state.parentNode!=common)
			this.exitState(state.parentNode)
		
		var id=state.getAttribute('id')		
		delete this.configuration[id]
		
		var onexit=this.dom.querySelectorAll("#"+id+" > onexit")
		for(var i=0; i<onexit.length; i++)
			try{this.execute(onexit[i])}
			catch(err){continue}
	}