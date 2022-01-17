function($jf)
	{	
		var f = $jf.jFragment('getFragment')
        var c = $jf.jFragment('option', 'color');

		//remove the jFragment from the DOM
		$(document)
			.unbind('mousemove.draggable')
			.unbind('mouseup.draggable')
			.unbind('mousedown.draggable')
			.unbind('click.draggable');
		$jf.remove();

        $jf.jFragment('destroy');
		
        //add the fragment into the construct, with dragging
		
        //TODO: try and get cf from somewhere else
        var cf = undefined;

		var df = new DisplayFragment(f,cf);

		df._fs.fill = c;		
		this._fc.add(df);
	}