function() {
		// see comment in ExtJS 4.1 doc for Ext.getBody()
		var body = Ext.getBody();
		this.height 	= body.getHeight() / 1.2;
		this.callParent(arguments);
	}