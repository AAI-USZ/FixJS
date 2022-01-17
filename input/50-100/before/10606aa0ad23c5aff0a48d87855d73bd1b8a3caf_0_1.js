function loadWidget(manifest) {
       require([manifest.WidgetRepositoryURL + "/"
                    + manifest.WidgetName + "/"
                    + manifest.WidgetName + ".js"],
               function(WidgetModule) {
                   WidgetModule.load(manifest, digest);
               });
   }