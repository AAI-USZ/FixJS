function doCopy() {
	     var selectedKeys = grid.selModel.selections.keys;
	     var target = panel.getForm().getValues('targetID').targetID;

             if(adapterData.satConf) {
	         var satconf = panel.getForm().getValues('targetSatConfID').targetSatConfID;
		 var mparams = {
		     entries:Ext.encode(selectedKeys),
		     satconf:satconf
		 };
             } else {
		 var mparams = {
		     entries:Ext.encode(selectedKeys)
		 };
             }

	     Ext.Ajax.request({
		 url: "dvb/copymux/" + target,
		 params: mparams,
		 failure:function(response,options) {
		    Ext.MessageBox.alert('Server Error','Unable to copy');
		 },
		 success: function() {
		     win.close();
		 }
	     });
	 }