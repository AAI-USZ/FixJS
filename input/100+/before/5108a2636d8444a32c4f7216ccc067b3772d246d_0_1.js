function(){
				var selection = Ext.ComponentQuery.query('viewport > browser')[0].getActiveTab().down('dataview, gridpanel').getSelectionModel().getSelection();
				var win = Ext.create('SmartWFM.view.baseActions.RenameWindow');
				win.down('textfield[name=name]').setValue(selection[0].get('name'));
				win.show();
			}