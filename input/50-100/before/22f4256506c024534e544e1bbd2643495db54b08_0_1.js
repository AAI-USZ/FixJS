function(name)
	{
		if(this.forms[name]) return false;
		return !!name.match(/^[a-z0-9_\-]+$/gi);
	}