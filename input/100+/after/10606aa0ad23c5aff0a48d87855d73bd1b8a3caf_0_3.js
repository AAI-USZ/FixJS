function fetchWidgets(activeWidgetInfos) {
        var rows = [];
        var row = {widgets:[]};
        for (var i=0; i<activeWidgetInfos.length; i++) {
            if(i%3==0) {
                row = {widgets:[]};
                rows.push(row);
            }
            row.widgets.push(activeWidgetInfos[i]);
        }
        App.loadMustacheTemplate("applications/calendar/tabs/dashboards/dashboardsTabTemplates.html","widgetsGrid", function(template){
            var html = template.render({rows: rows});
            $("#dashboardsTab .tab-content").empty();
            $("#dashboardsTab .tab-content").append(html);
            $(".flx-remove-widget").click(function() {
                var widgetId = $(this).parent().parent().parent().attr("id");
                var i = widgetId.indexOf("-widget");
                var widgetName = widgetId.substring(0, i);
                removeWidget(widgetName);
            })
            loadWidgets(activeWidgetInfos)
        });
   }