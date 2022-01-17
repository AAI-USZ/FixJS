function(dom)
	{
		this.dom=dom
		this.validate()
		
		// interpret top-level <datamodel> if present
		var d=dom.querySelector("scxml > datamodel")
		if(d) this.execute(d)
		
		this.running=true
		console.log("The interpreter for "+this.name+" is now ready.")
		
		var init
		// find initial state
		if(dom.documentElement.hasAttribute("initial"))
		{
			init=dom.getElementById(dom.documentElement.getAttribute("initial"))
			if(!init) throw "initial state with id='"
				+dom.documentElement.getAttribute("initial")
				+"' not found in "+this.name
		}
		else
			init=dom.querySelector("scxml > *[initial]")
				|| dom.documentElement.firstElementChild
		// and... enter !
		this.enterState( init )
	}