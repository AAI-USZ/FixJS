function(s,el)
	{
		// TODO: check that the expr doesn't do horrible stuff
		
		try{ with(this.datamodel){ return eval(s) } }
		catch(e){
			this.internalQueue.push(new SCxml.Error("error.execution",el,e))
			throw e
		}
	}