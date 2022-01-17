function() {
		// see comment in ExtJS 4.1 doc for Ext.getBody()
		this.height 	= Ext.getBody().getHeight() / 1.2;
		this.callParent(arguments);
	}