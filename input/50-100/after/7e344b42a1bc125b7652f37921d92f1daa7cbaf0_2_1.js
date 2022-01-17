function (config) {
    this.parentView = config.parentView;
    this.bankId = config.bankId;

    this.w = config.w || 200;
    this.h = config.h || 100;
    this.size = 200;
    this.duration = 500;

    // set initial dates for graph
    this.toDate = moment().format('YYYY-MM-DD');
    this.fromDate = moment().subtract('months', 2).format('YYYY-MM-DD');

    this.fetchData();
  }