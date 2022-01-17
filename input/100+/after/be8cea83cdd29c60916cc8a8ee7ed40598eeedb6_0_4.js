function(df, pos)
	{
		if(!$.isNumeric(pos))
			(df._cf == undefined) ? pos = 0 : pos = df._cf.order;
		else
			pos = this._bound(pos);
		
		this.addChildAt(df, pos);
		
		this._updateLength();
		
		df._mouse_offset = Math.PI*df.getLength()/this._eff_length;
		this._updateLayout( 
			pos+1,
			this.getFragAt(pos+1).getStart() + df._mouse_offset,
			true
		);
		
		return this;
	}