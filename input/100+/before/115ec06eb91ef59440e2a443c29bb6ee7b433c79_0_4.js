function(parent)
	{
		var id, state
		if(parent.hasAttribute("initial"))
		{
			state=this.dom.getElementById(id=parent.getAttribute("initial"))
			if(!state) throw "initial state with id='"
				+id+"' not found in "+this.name
			return state
		}

		if(state=this.dom.querySelector("#"+parent.getAttribute("id")
			+" > *[initial]"))
			return state
		
		state=parent.firstElementChild
		while(state && !(state.tagName in SCxml.STATE_ELEMENTS))
			state=state.nextElementSibling
		return state
	}