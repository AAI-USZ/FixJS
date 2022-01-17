function(){
				var selection = Ext.ComponentQuery.query('viewport > browser')[0].getActiveTab().down('dataview, gridpanel').getSelectionModel().getSelection();
				var win = Ext.create('SmartWFM.view.baseActions.RenameWindow');
				var name = selection[0].get('name');
				var path = selection[0].get('path');
				win.down('form').getForm().setValues({
					name: name,
					path: path,
					oldName: name
				});
				win.show();
			}