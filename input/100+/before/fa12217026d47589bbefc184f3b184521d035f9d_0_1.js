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
			
		}).appendTo(this._$canvas.parent());
	    
        $jf.on('dragstop', function(event, ui) {
				$jf.remove();
                //Tell the server to remove the fragment
                if(df._cf!=undefined)
                    console.log('TODO: tell server to remove cf:'+df._cf.id);
		});
        
        $jf.data('cf', df._cf);
        
		var l = stage.mouseX - 0.5 * $jf.outerWidth();
		var t = stage.mouseY - 0.5 * $jf.height();

        console.log('{"position":absolute, "left":'+l+', "top":'+t+',}');
		
		$jf.css({'position':'absolute', 'left':l, 'top':t,});
		
		this._fc.rm(df);
		
		var jev = $.Event('mousedown', {
            'which':1,
            'pageX':(o.left+stage.mouseX),
            'pageY':(o.top+stage.mouseY),
        });
		
       // console.log('$jf.trigger(jev):');
        //for(var i in jev)
          //  console.log('  jev.'+i+' = '+jev[i]);
		$jf.trigger(jev);
    }