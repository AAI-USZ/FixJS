function () {
    var dateFormat = App.util.localDateFormat.toUpperCase();
    var toDate   = moment(this.toDate).format(dateFormat);
    var fromDate = moment(this.fromDate).format(dateFormat);

    this.$el.html(this.template({toDate: toDate, fromDate: fromDate}));
    $('#tab-overview', this.parentView.el).html(this.el);

    this.$el.find('div.date').datepicker({ weekStart: 1 });
    this.delegateEvents();
    return this;
  }