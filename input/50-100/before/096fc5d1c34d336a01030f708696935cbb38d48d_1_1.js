function(dfs)
	{
		for(i in dfs)
			this.addChild(dfs[i]);
		
		for(i in this.children)
		{
			this.children[i].getCf().order = i;
		}
		
		this._updateLength();
		this._updateLayout(0,0,false);
		
		return this;
	}