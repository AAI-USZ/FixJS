function(event) {
    event.preventDefault();

    var toDate   = this.$el.find('#dp3 input').val();
    var fromDate = this.$el.find('#dp4 input').val();

    var dateFormat = App.util.localDateFormat.toUpperCase();
    this.toDate   = moment(toDate, dateFormat).format('YYYY-MM-DD');
    this.fromDate = moment(fromDate, dateFormat).format('YYYY-MM-DD');

    this.fetchData(toDate, fromDate);
  }