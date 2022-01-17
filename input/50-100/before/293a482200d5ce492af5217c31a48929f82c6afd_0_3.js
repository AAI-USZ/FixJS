function(e) {
	if(window.event)
	{
		event.returnValue = false;
	}
	else
	{
		e.preventDefault();
	}
}