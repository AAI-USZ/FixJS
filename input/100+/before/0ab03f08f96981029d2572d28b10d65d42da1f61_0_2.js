function()
	{
		var me = this;
		if(me.disabled || !me.rendered)
		{
			return false;
		}
		return me.editor && me.editor.initialized && me.editor.isDirty();
	}