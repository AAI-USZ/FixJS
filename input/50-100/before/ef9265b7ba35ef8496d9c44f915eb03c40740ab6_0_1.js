function(grid, record) {
      console.log('Double click on ' + record.get('name'));

      var view = Ext.widget('entryedit');
      view.down('form').loadRecord(record);

      view.show();
   }