function(){
                var f = this.get('form');
                this.onSave(f.pluginId,f.name,f.description,f.type,f.region,f.weight,f.enabled);
            }