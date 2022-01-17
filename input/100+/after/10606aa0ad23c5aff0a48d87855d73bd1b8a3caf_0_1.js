function(template){
            var html = template.render(dashboardsTemplateData);
            $("#dashboardTabs").replaceWith(html);
            $("#addWidgetButton").unbind();
            $("#manageDashboardsButton").unbind();
            $(".dashboardName").unbind();
            $("#addWidgetButton").click(addWidget);
            $("#manageDashboardsButton").click(manageDashboards);
            $(".dashboardName").click(function(evt) {
                var dashboardId = Number($(evt.target).parent().attr("id").substring("dashboard-".length));
                setActiveDashboard(dashboardId);
            });
            fetchWidgets(getActiveWidgetInfos(dashboardsTemplateData.dashboards));
        }