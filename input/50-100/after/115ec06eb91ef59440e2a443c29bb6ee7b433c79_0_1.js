function expr(s,el)
	{
		// TODO: check that the expr doesn't do horrible stuff
		
		try{ with(this.datamodel){ return eval(s) } }
		catch(e){ this.error("execution",el,e) }
	}