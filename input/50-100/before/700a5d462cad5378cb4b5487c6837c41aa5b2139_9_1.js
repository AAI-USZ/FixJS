function(){
            $.each(sakai.config.worldTemplates, function(index, item){
                tabs.push({
                    id: item.id,
                    title: sakai.api.i18n.getValueForKey(item.titlePlural)
                });
            });
            fetchWorldData();
        }