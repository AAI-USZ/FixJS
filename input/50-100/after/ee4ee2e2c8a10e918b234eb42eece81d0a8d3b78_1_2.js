function(confirmed){
                    if(!confirmed)
                        return; 
                    
                    self.editorPane.disable();
                    self.model.removeExtensionPlugin(pluginId).then(function(){
                        var region = self.editorPane.regionSelect.get('item').identifier;
                        self.editorPane.reloadGrid(self.navigationId,region).
                        then(function(){
                            self.editorPane.enable();
                        })
                    })
                }