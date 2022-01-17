function(mode)
	{
		this.mode = this.modeMap[mode];

    if(this.mode == null){
      this.mode = this.DEFAULT_MODE;
    }
    
		if(this.editor != null)
		{
			if(this.mode != null){
				var HLMode = require(this.MODE_BASE + this.mode).Mode;
				this.editor.getSession().setMode(new HLMode());
			}
		}
		
	}