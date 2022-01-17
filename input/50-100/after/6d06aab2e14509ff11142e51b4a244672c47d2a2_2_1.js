function() {
		Ext.apply(this,{
			iconCls:"default-module-icon",
			region: 'west',
			title: 'Modules',
			collapsible: false,
	        split: true,
	        width: 350, 
	        animate: false,
	        margins:'3 0 3 3',
            cmargins:'3 3 3 3'
		});
		Pyfrid.ModuleManager.superclass.initComponent.apply(this, arguments);
    }