function(pluginId){
                var self = this;
                this.editorPane.disable();
                this.model.removeExtensionPlugin(pluginId).then(function(){
                    var region = self.editorPane.regionSelect.get('item').identifier;
                    self.editorPane.reloadGrid(self.navigationId,region).
                    then(function(){
                        self.editorPane.enable();
                    })
                })
            }