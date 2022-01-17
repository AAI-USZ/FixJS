function() {
      this.setCityConfig('baltimore');
      var dashboardView = new Dashboard.Views.Main();
      this.showView(dashboardView);
      dashboardView.initDailyBriefingController();
    }