function(form, action) {
              Ext.getCmp("newDialog").destroy();

              if( !action.result ) {
                Ext.MessageBox.alert("error", action.response.responseText);
                return;
              }
              Ext.MessageBox.alert("error", action.result.error);

            }