function() {
//				this.status_windows = {};
				Ext.apply(this, {
							iconCls : "default-device-icon",
							region : 'east',
							title : 'Devices',
							id : 'device-manager',
							collapsible : false,
							split : true,
							width : 350,
							animate : false,
							margins:'3 0 3 3',
            				cmargins:'3 3 3 3'
						});
				Pyfrid.DeviceManager.superclass.initComponent.apply(this,
						arguments);
				this.on('click', this.showStatus);
			}