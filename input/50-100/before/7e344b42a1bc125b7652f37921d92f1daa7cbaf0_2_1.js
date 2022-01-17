function (config) {
    this.parentView = config.parentView;
    this.bankId = config.bankId;

    this.w = config.w || 200;
    this.h = config.h || 100;
    this.size = 200;
    this.duration = 500;

    this.fetchData();
  }