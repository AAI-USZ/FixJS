function(i)
	{
		i = i % this.children.length;
		if(i < 0) return i + this.children.length;
		return i;
	}