function(city) {
      this.setCityConfig(city);
      var dashboardView = new Dashboard.Views.Main({"config": Config});
      this.showView(dashboardView);
      dashboardView.initDailyBriefingController();
    }