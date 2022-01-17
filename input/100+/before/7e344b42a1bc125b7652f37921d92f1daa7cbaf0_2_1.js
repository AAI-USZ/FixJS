function(fromDate, toDate) {
    if(!fromDate || !toDate) {
      toDate = moment().format('YYYY-MM-DD');
      fromDate = moment().subtract('months', 2).format('YYYY-MM-DD');
    }

    var self = this;
    $.ajax({
      url: "/api/banks/" + this.bankId + "/balance",
      dataType: 'json',
      data: { date: toDate, from_date: fromDate },
      success: function(data, textStatus, xhr) {
        self.renderPlot(data);
      }
    });
  }