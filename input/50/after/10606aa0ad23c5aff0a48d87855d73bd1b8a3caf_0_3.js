function getActiveWidgetInfos(dashboards) {
        var activeDashboard = getActiveDashboard(dashboards);
        return activeDashboard.widgets;
    }