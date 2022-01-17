function tabKeyHandler(e)
{
	if(e.keyCode == 9)
	{
		this.value += "\t";
		if(e.preventDefault)
			e.preventDefault();
		return false;
	}
}