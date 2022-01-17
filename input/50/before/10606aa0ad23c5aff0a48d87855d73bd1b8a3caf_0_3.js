function getActiveWidgets(dashboards) {
        var activeDashboard = getActiveDashboard(dashboards);
        return activeDashboard.widgets;
    }