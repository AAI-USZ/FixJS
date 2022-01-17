function(){
          //store.setBaseParam( 'category', '<reset>');
          store.setBaseParam('processName', '');
          store.load({params: {start: 0, limit: 25}});
          Ext.getCmp('searchTxt').setValue('');
          //comboCategory.setValue('');
          //store.reload();
        }