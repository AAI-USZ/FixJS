function()
	{
		if(this.id == undefined) return f.length;
		if(this.e_feat > 0)
		{
			var ef = f.getFeatById(this.e_feat);
			if(ef != null)
				return this.e_offset + ef.end;
		}
		return f.length - this.s_offset;
	}