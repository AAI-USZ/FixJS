function(response, request) {
                // Unmask the viewport
                Ext.Viewport.unmask();
                    if (response.result !='OK')
                    {
                        //Ext.Msg.alert('Login Error', response.message, Ext.emptyFn);
                    } 
                    else 
                    {
                        Ext.Msg.alert('Login OK');
                        var locationsStore = Ext.getStore('Locations');
                        locationsStore.load();
                    }
            }