function()
	{
		if(this.id == undefined) return f.getLength();
		if(this.e_feat > 0)
		{
			var ef = f.getFeatById(this.e_feat);
			if(ef != null)
				return this.e_offset + ef.end;
		}
		return f.getLength() - this.s_offset;
	}