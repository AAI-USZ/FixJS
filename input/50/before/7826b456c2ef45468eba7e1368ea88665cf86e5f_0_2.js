function(city) {
      this.setCityConfig(city);
      var dashboardView = new Dashboard.Views.Main();
      this.showView(dashboardView);
      dashboardView.initDailyBriefingController();
    }