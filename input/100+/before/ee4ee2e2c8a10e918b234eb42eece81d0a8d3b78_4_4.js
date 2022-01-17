function(plugin){
                this.nameText.set("value",plugin.name);
                this.descriptionText.set("value",plugin.description);
                
                var region = "";
                if("region" in plugin){
                    region = plugin.region;
                } else {
                    region = this.regionSelect.get("item").identifier;
                }
                
                this.typeSelect.set("value",plugin.type);
                this.formRegionSelect.set("value",region);
                this.weightText.set("value",plugin.weight);
                this.disabledCheckBox.set("checked",!plugin.enabled);
                this.pluginId = plugin.pluginId;
            }