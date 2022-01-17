function(map) {
        this.map = map;
        var wrapper1 = new Ext.Panel({
            items: [{ 
            		xtype: 'button', 
            		tooltip: 'Bewaar of bewerk dit thema',
            		handler: function() {
            			app.save(app.showUrl);
            		},
            		scope: this,
            		iconCls: 'icon-save'
            		}],
            cls: 'admin-overlay-element',
            border: false
        });
        var wrapper2 = new Ext.Panel({
            items: [{ 
            		xtype: 'button', 
            		tooltip: 'Exporteer naar embedded viewer',
            		handler: function() {
            			app.save(app.showEmbedWindow);
            		},
            		scope: this,
            		iconCls: 'icon-export'
            		}],
            cls: 'admin-overlay-element',
            border: false
        });
        var wrapper3 = new Ext.Panel({
            items: [{ 
            		xtype: 'button', 
            		tooltip: "Open de lijst met opgeslagen thema's",
            		handler: function() {
            			this.loadmaps();
            		},
            		scope: this,
            		icon: "../theme/app/img/silk/folder_picture.png"
            		}],
            cls: 'admin-overlay-element',
            border: false
        });
        var wrapper4 = new Ext.Panel({
            items: [{ 
            		xtype: 'button', 
            		handler: function() {
            			alert("Nog niet geimplementeerd");
            			//app.save(app.showEmbedWindow);
            		},
            		scope: this,
            		iconCls: 'icon-delete'
            		}],
            cls: 'admin-overlay-element',
            border: false
        });
        this.add(wrapper1);
        this.add(wrapper2);
        this.add(wrapper3);
        this.doLayout();
    	this.hide();
    }