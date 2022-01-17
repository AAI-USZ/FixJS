function interpret(dom)
	{
		this.dom=dom
		this.validate()


		var lb=this.lateBinding // just temporarily forget this
		this.lateBinding=true	// to let execute() do its job
		
		// interpret top-level <datamodel> and scripts if present
		var d=dom.querySelector("scxml > datamodel")
		if(d) try{this.execute(d)} catch(err){}

		d=dom.querySelectorAll("scxml > script")
		for(var i=0; i<d.length; i++)
			try{this.expr(d[i].textContent,d[i])} catch(err){}


		// interpret other <datamodel>s, but do not assign if binding="late"
		d=dom.querySelectorAll("scxml > * datamodel")
		for(var i=0; i<d.length; i++)
		{
			if(lb)
				try{this.declare(d[i])} catch(err){}
			else
				try{this.execute(d[i])} catch(err){}
		}
		// now restore lateBinding
		this.lateBinding=lb
		
		this.running=true
		console.log("The interpreter for "+this.name+" is now ready.")
		
		var init=this.firstState(dom.documentElement)
		// and... enter !
		if(!init) throw this.name + " has no suitable initial state."
		this.enterState( init )
	}