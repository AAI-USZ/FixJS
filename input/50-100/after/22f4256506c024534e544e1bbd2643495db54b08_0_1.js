function(name)
	{
		if(this.forms[name]) return false;
		var kw = EpiCollect.KEYWORDS;
		
		for(var i = kw.length; kw--;)
		{
			if (name == kw[i]) return false;
		}
		return !!name.match(/^[a-z0-9_\-]+$/gi);
	}