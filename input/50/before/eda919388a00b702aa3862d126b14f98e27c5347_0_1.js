function()
	{
		if(!this._selected)
		{
			return ""
		}
		return this.seq.substring(this._select_start - 1, this._select_end - 1);
	}