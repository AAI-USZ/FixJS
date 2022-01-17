function(i)
	{
        if(this.children.length == 0) return 0;
		i = i % this.children.length;
		if(i < 0) return i + this.children.length;
		return i;
	}