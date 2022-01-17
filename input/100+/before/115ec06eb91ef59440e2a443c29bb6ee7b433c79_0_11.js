function(trans)
	{
		var id=trans.getAttribute("target")
		var state=this.dom.getElementById(id)
		var parent=trans.parentNode
		console.log("transition to "+id+" from "+parent.getAttribute("id"))

		// find the closest common parent
		while((parent=parent.parentNode).tagName!="scxml")
			if(this.dom.querySelector("#"+ parent.getAttribute('id') +" > #"+id))
				break

		this.exitState(trans.parentNode, parent)
		
		// now, between exit and entry, run the executable content if present
		this.execute(trans)
		
		if(!state) throw this.name+": transition target id='"+id+"' not found."
		this.enterState(state)
	}