function(event)
	{
		function filter(e)
		{
			if(e.nodeType!=1 || e.tagName!="transition") return false
			if(event) return e.hasAttribute("event") && event.match(e)
			else return !e.hasAttribute("event")
		}
		var trans=[]
		var conf=this.sortedConfiguration()
		for(var i=0; i<conf.length; i++)
		{
			var cs=conf[i].childNodes
			for(var c=0; c<cs.length; c++) if(filter(cs[c]))
				trans.push(cs[c])
		}
		return trans
	}