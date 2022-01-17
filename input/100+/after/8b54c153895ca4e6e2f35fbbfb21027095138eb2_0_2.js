function(df)
	{
        console.log('leave('+df+')');
		var o = this._$canvas.parent().offset();
		var self = this;
		
		var $jf = $('<div/>').jFragment({
			'fragment':df.f(),
			'containment':'parent',
			'scroll':false,
			'color':df._fs.fill,
            'distance':0,
			
		}).on('dragstop', function(event, ui) {
                console.log('dragstop called');
				$jf.remove();
                //Tell the server to remove the fragment
                if(df._cf!=undefined)
                {
                   self._server.rmFrag(df._cf.id);
                }
		}).appendTo(this._$canvas.parent());

        
        $jf.data('cf', df._cf);
        
		var l = stage.mouseX - 0.5 * $jf.outerWidth();
		var t = stage.mouseY - 0.5 * $jf.height();

		$jf.css({'position':'absolute', 'left':l, 'top':t,});
		
		this._fc.rm(df);
		
		var jev = $.Event('mousedown', {
            'which':1,
            'pageX':(o.left+stage.mouseX),
            'pageY':(o.top+stage.mouseY),
        });
		console.log('firing mousedown event');
		$jf.trigger(jev);
    }