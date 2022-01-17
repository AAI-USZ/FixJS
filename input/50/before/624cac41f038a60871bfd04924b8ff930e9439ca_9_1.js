function(id, showSettings, context, widgetData, widgetDataPassthrough){
                var obj = this.loadWidgets(id, showSettings, context, widgetData, widgetDataPassthrough);
                this.loaded.push(obj);
            }