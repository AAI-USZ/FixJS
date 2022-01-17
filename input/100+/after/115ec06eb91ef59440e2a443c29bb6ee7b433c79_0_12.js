function sortedConfiguration()
	{
		var conf=[]
		var leaves={}
		var c
		for(var i in this.configuration)
			leaves[i]=this.configuration[i]
		
		for(i in this.configuration) 
		if(this.configuration[i].parentNode.nodeName!="scxml")
			delete leaves[this.configuration[i].parentNode.getAttribute('id')]
		
		for(i in leaves)
		{
			conf.push(c=leaves[i])
			c.visited=true
			while((c=c.parentNode).nodeName!="scxml")
				if(!c.visited)
				{
					c.visited=true
					conf.push(c)
				}
		}
		for(var i in this.configuration)
			this.configuration[i].visited=false
		return conf
	}