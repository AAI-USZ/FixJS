function copySelected() {

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

	 targetStore = new Ext.data.JsonStore({
	     root:'entries',
	     id: 'identifier',
	     url:'dvb/adapter',
	     fields: ['identifier', 
		      'name'],
	     baseParams: {sibling: adapterId}
	 });
	 if(adapterData.satConf) {
	     targetSatConfStore = new Ext.data.JsonStore({
                 root:'entries',
                 id: 'identifier',
                 url:'dvb/satconf',
                 fields: ['identifier', 
		          'name'],
	          baseParams: {adapter: adapterId}
              });
             satConf = new Ext.form.ComboBox({
                 store: targetSatConfStore,
                 fieldLabel: 'Target Satellite config',
                 name: 'targetsatconf',
                 hiddenName: 'targetSatConfID',
                 editable: false,
                 allowBlank: false,
                 triggerAction: 'all',
                 mode: 'remote',
                 displayField:'name',
                 valueField:'identifier',
                 emptyText: 'Select target adapter first...'
             });
         } else {
             satConf = null;
         }

	 var panel = new Ext.FormPanel({
	     frame:true,
	     border:true,
	     bodyStyle:'padding:5px',
	     labelAlign: 'right',
	     labelWidth: 150,
	     defaultType: 'textfield',
	     items: [

		 new Ext.form.ComboBox({
		     store: targetStore,
		     fieldLabel: 'Target adapter',
		     name: 'targetadapter',
		     hiddenName: 'targetID',
		     editable: false,
		     allowBlank: false,
		     triggerAction: 'all',
		     mode: 'remote',
		     displayField:'name',
		     valueField:'identifier',
		     emptyText: 'Select target adapter...',
		     listeners: {
			'select': function(combo, value) {
                            if (satConf) {
                                satConf.emptyText = 'Select satellite configuration...';
                                satConf.clearValue();
                                targetSatConfStore.baseParams = {adapter: combo.value};
                                targetSatConfStore.load();
                                satConf.focus();
                                satConf.expand();
                            }
			}
                    }
		 }),
		 satConf,
	     ],
	     buttons: [{
		 text: 'Copy',
		 handler: doCopy
             }]
	 });

	 win = new Ext.Window({
	     title: 'Copy multiplex configuration',
             layout: 'fit',
             width: 500,
             height: 150,
	     modal: true,
             plain: true,
             items: panel
	 });
	 win.show();
     }