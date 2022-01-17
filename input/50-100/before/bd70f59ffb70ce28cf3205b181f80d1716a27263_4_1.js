function (b)
	{
		var dv = this.getDocviewer ();

		try {
			Ext.destroy(Ext.get('downloadIframe'));
		}
		catch(e) {}

		Ext.DomHelper.append (document.body, {
			tag			: 'iframe'
		,	id			: 'downloadIframe'
		,	frameBorder	: 0
		,	width		: 0
		,	height		: 0
		,	css			: 'display:none;visibility:hidden;height:0px;'
		,	src			: 'data/download.jsp?berkas='+ dv.berkas.get('sha')
						+'&nama='+ dv.berkas.get ('nama')
		});
	}