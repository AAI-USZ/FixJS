function(form, action) {
              Ext.getCmp("newDialog").destroy();

              if( !action.result ) {
                Ext.MessageBox.alert("error", _('ID_ERROR'));
                return;
              }
              Ext.MessageBox.alert("error", action.result.error);

            }