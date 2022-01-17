function(template){
            var html = template.render({rows: rows});
            $("#dashboardsTab .tab-content").empty();
            $("#dashboardsTab .tab-content").append(html);
            $(".flx-remove-widget").click(function() {
                var widgetId = $(this).parent().parent().parent().attr("id");
                var i = widgetId.indexOf("-widget");
                var widgetName = widgetId.substring(0, i);
                removeWidget(widgetName);
            })
            loadWidgets(activeWidgets)
        }