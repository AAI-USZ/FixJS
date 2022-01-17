function (b)
	{
		var dv	= this.getDocviewer ();
		var c	= dv.down ('#content');
		var	p	= dv.down ('#pages');

		if (dv.mime == 'application/pdf') {
			if (dv.seq > 0) {
				dv.seq		= dv.seq - 1;
				dv.target	= dv.src +'_'+ dv.seq +'.png'

				c.removeAll ();
				c.add ({
					xtype	: 'image'
				,	mode	: 'image'
				,	itemId	: 'content-img'
				,	src		: dv.target
				});

				dv.set_page_number (dv.seq + 1);
			}
		}
	}