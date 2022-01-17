function(e) {
	e = e ? e : window.event;

	if(e.stopPropagation)
	{
		e.stopPropagation();
	}	

	if(e.preventDefault)
	{
		e.preventDefault();
	}

	e.cancelBubble = true;
	e.cancel = true;
	e.returnValue = false;
	
	return false;
}