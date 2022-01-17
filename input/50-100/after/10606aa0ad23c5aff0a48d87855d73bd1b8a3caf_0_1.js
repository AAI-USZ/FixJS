function loadWidget(widgetInfo) {
       require([widgetInfo.manifest.WidgetRepositoryURL + "/"
                    + widgetInfo.manifest.WidgetName + "/"
                    + widgetInfo.manifest.WidgetName + ".js"],
               function(WidgetModule) {
                   WidgetModule.load(widgetInfo, digest);
               });
   }