function (key, pluginData, pluginMetadata) { 
                    var start = new Date().getTime();
                    
                    var metadata = pluginMetadata.structure,  
                        permanent = pluginData.isPermanent ? ' glimpse-permanent' : '',
                        html = '<div class="glimpse-panel glimpse-panelitem-' + key + permanent + '" data-glimpseKey="' + key + '"><div class="glimpse-panel-message">Loading data, please wait...</div></div>',
                        panel = $(html).appendTo(elements.panelHolder);
        
                    
                    if (!pluginData.isLazy) {
                        renderEngine.insert(panel, pluginData.data, metadata);
                    }
                    else {
                        panel.addClass('glimpse-lazy-item');
                        pubsub.publishAsync('action.plugin.lazyload', key);
                    }
        
                    var end = new Date().getTime(); 
                    console.log('Total render time for "' + key + '": ' + (end - start));
        
                    return panel;
                }