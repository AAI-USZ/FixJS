function(event) {
    event.preventDefault();

    var toDate   = this.$el.find('#dp3 input').val();
    var fromDate = this.$el.find('#dp4 input').val();

    toDate   = moment(toDate).format('YYYY-MM-DD');
    fromDate = moment(fromDate).format('YYYY-MM-DD');

    this.fetchData(toDate, fromDate);
  }