function (type)
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
	
	this.attachEvent('on' + type, catcher)
	return catcher
}