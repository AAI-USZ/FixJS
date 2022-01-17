function () {

    	this.statusBar = Ext.create("PartKeepr.Statusbar");
    	
    	this.messageLog = this.createMessageLog();
    	
    	this.centerPanel = Ext.create("Ext.tab.Panel", {
    			xtype: 'tabpanel',
    			border: false,
    			region: 'center',
    			bodyStyle: 'background:#DBDBDB',
    			plugins: Ext.create('Ext.ux.TabCloseMenu')
    			
    	});
    	
    	this.menuBar = Ext.create("PartKeepr.MenuBar");
    	
    	this.menuBar.disable();
    	Ext.create('Ext.container.Viewport', {
    		layout: 'fit',
    		items: [{
    			xtype: 'panel',
    			border: false,
                layout: 'border',
                items: [
                    this.centerPanel,
                    this.messageLog
                ],
                bbar: this.statusBar,
                tbar: this.menuBar
    		}]

        });
    }