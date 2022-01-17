function(){
                  var uploader = Ext.getCmp('uploader');

                  if(uploader.getForm().isValid()){
                    uploader.getForm().submit({
                      url: 'languages_Import',
                      waitMsg: _('ID_UPLOADING_TRANSLATION_FILE'),
                      success: function(o, resp){
                        w.close();
                        infoGrid.store.reload();

                        Ext.MessageBox.show({
                          title: '',
                          width: 500,
                          height: 500,
                          msg: "<pre style='font-size:10px'>"+resp.result.msg+"</pre>",
                          buttons: Ext.MessageBox.OK,
                          animEl: 'mb9',
                          fn: function(){},
                          icon: Ext.MessageBox.INFO
                        });
                      },
                      failure: function(o, resp){
                        w.close();
                        //alert('ERROR "'+resp.result.msg+'"');
                        Ext.MessageBox.show({title: '', msg: resp.result.msg, buttons:
                        Ext.MessageBox.OK, animEl: 'mb9', fn: function(){}, icon:
                        Ext.MessageBox.ERROR});
                        //setTimeout(function(){Ext.MessageBox.hide(); }, 2000);
                      }
                    });
                  }
                }