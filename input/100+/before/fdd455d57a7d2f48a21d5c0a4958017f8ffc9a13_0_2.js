function(df)
	{
		var o = this._$canvas.parent().offset();
		var self = this;
		
		var $jf = $('<div>').jFragment({
			'fragment':df.f(),
			'constructFragment':df._cf,
			'containment':'parent',
			'scroll':false,
			'color':df._fs.fill,
			'stop': function(event, ui) {
				$jf.remove();
			},
			'drag': function(event, ui) {
				var p = self._fc.globalToLocal( event.pageX - o.left, event.pageY - o.top);
				if( (p.x*p.x + p.y*p.y) < F.joinRadius * F.joinRadius )
				{
					self.join($jf);
				}
			},	
		});
		
		this._$canvas.parent().append($jf);
		
		var l = stage.mouseX - 0.5 * $jf.outerWidth();
		var t = stage.mouseY - 0.5 * $jf.height();
		
		$jf.css({'left':l, 'top':t,});
		
		this._fc.rm(df);
		
		var jev = $.Event('mousedown', {'which':1,'pageX':(o.left+stage.mouseX),'pageY':(o.top+stage.mouseY),});
		
		$jf.trigger(jev);
		
	}