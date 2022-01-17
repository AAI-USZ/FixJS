function(id, showSettings, context, widgetData, widgetDataPassthrough, callback) {
                var obj = this.loadWidgets(id, showSettings, context, widgetData, widgetDataPassthrough, callback);
                this.loaded.push(obj);
            }