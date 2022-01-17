function()
	{
		if(!this._selected)
		{
			return ""
		}
		return this.seq.substring(this._select_start, this._select_end);
	}