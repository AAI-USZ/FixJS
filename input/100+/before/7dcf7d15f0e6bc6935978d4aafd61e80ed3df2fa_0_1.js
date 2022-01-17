function doCopy() {
	     var selectedKeys = grid.selModel.selections.keys;
	     var target = panel.getForm().getValues('targetID').targetID;

	     Ext.Ajax.request({
		 url: "dvb/copymux/" + target,
		 params: {
		     entries:Ext.encode(selectedKeys)
		 },
		failure:function(response,options) {
		    Ext.MessageBox.alert('Server Error','Unable to copy');
		},
		 success: function() {
		     win.close();
		 }
	     });
	 }