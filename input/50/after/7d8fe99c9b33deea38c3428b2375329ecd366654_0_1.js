function() {
        console.log(app.collections.dashboards)
        var dashboardsView = new app.views.Dashboards({ collection: app.collections.dashboards });
        that.showView(dashboardsView);
      }