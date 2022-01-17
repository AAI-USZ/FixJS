function(grid, record) {
      var newDialog = Ext.widget('entryedit');
      newDialog.getForm().loadRecord(record);

      newDialog.show();
   }