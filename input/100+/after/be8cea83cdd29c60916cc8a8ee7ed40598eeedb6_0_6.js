function(df)
	{
		//set the title and description
		this._$info.find('#fragment_name').text(df.f().getName());
		this._$info.find('#fragment_desc').text(df.f().getDesc());
		
		var loc = ra2xy(df.getRadius(), df.getMid());
		loc = this._fc.localToGlobal(loc.x, loc.y);
		
		//set position
		this._$info.css({position: 'absolute', zindex:100, left:loc.x - 33, top:loc.y - (this._$info.outerHeight() + 14),});
		this._$info.css({display:'block',});
		
		//set remove callback
		var self = this;
		this._$info.find('#fragment_remove')
			.unbind('click')
			.click(function() {self.hideInfo();self._fc.rm(df);});
		
		//binding to click means it gets triggered immediately
		this._$canvas.mousedown(function() {self.hideInfo();});
	}