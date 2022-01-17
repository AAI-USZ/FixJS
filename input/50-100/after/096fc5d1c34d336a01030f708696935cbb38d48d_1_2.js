function($jf)
	{	
        console.log('Suppressing join for debug');
        return;

		var f = $jf.jFragment('getFragment')
        var c = $jf.jFragment('getColor');
        console.log('setting color to '+c);

        //add the fragment into the construct, with dragging
		
        //TODO: try and get cf from somewhere else
        var cf = undefined;

		var df = new DisplayFragment(f,cf);

		df._fs.fill = c;		
		this._fc.add(df);
	}