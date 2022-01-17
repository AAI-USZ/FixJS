function(fromDate, toDate) {
    if(!fromDate || !toDate) {
      toDate = this.toDate;
      fromDate = this.fromDate;
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