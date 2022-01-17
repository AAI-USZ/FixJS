function(df)
	{
		df.animate({rotation: this.getFragAt(this.getChildIndex(df)-1).getEnd()});
		this._datum = NaN;
		return this;
	}