function() {
//				this.status_windows = {};
				Ext.apply(this, {
							iconCls : "default-device-icon",
							region : 'east',
							title : 'Devices',
							id : 'device-manager',
							collapsible : true,
							split : true,
							width : 350,
							minSize : 100,
							maxSize : 800,
							animate : false
						});
				Pyfrid.DeviceManager.superclass.initComponent.apply(this,
						arguments);
				this.on('click', this.showStatus);
			}