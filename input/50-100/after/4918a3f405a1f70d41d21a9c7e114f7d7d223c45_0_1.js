function (type)
{
	var c = this.__pmc__catcher
	if (!c)
	{
		var node = this
		function catcher ()
		{
			if (event.__pmc_dispatched)
				return
			event.__pmc_dispatched = true
			
			var w = getEventWrapper(event)
			
			node.__pmc_dispatchEvent(w)
		}
		
		c = this.__pmc__catcher = catcher
	}
	
	var key = '__pmc_catcher_bind:' + type
	if (!c[key])
	{
		this.attachEvent('on' + type, c)
		c[key] = true
	}
	return catcher
}