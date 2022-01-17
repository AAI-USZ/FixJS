function(dom)
	{
		this.dom=dom
		this.validate()


		var lb=this.lateBinding // just temporarily forget this
		this.lateBinding=true	// to let execute() do its job
		
		// interpret top-level <datamodel> if present
		var d=dom.querySelector("scxml > datamodel")
		if(d) try{this.execute(d)} catch(err){}

		// interpret other <datamodel>s, but do not assign if binding="late"
		d=dom.querySelectorAll("scxml > * datamodel")
		for(var i=0; i<d.length; i++)
		{
			if(lb)
				try{this.declare(d[i])} catch(err){throw err}
			else
				try{this.execute(d[i])} catch(err){throw err}
		}
		// now restore lateBinding
		this.lateBinding=lb
		
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
				|| this.firstState(dom.documentElement)
		// and... enter !
		if(!init) throw this.name + " has no suitable initial state."
		this.enterState( init )
	}