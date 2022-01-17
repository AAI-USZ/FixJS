function($jf)
	{		
		//add the fragment into the construct, with dragging
		var f = $jf.jFragment('option', 'fragment');
		var cf = $jf.jFragment('option', 'constructFragment');
		
        console.log('d.join($jf): f = ' + f);
		var df = new DisplayFragment(f,cf);
		
		df._fs.fill = $jf.jFragment('option', 'color');
		
		this._fc.add(df);
		
		//remove the jFragment from the DOM
		$(document)
			.unbind('mousemove.draggable')
			.unbind('mouseup.draggable')
			.unbind('mousedown.draggable')
			.unbind('click.draggable');
			
		$jf.jFragment('destroy');
		
		$jf.remove();
        console.log('~d.join()');
	}