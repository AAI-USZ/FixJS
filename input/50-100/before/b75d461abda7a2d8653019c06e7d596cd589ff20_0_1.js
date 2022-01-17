function(mode)
	{
		if(mode == null){
			mode = this.DEFAULT_MODE;
		}
		this.mode = this.modeMap[mode];
		
		if(this.editor != null)
		{
			if(this.mode != null){
				var HLMode = require(this.MODE_BASE + this.mode).Mode;
				this.editor.getSession().setMode(new HLMode());
			}
			else {
				this.editor.getSession().setMode(null);
			}
		}
		
	}