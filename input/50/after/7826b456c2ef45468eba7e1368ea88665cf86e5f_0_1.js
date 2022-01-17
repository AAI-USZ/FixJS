function() {
      this.setCityConfig('baltimore');
      var dashboardView = new Dashboard.Views.Main({"config": Config});
      this.showView(dashboardView);
      dashboardView.initDailyBriefingController();
    }