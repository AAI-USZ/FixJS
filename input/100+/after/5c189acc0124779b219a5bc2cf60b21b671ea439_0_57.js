function(formData, load_data, loader) {
    var self      = this;

    if(loader) { self.showLoadingMessage($('#mapper-loading-message').text()); }
    $.ajax({
      type     : 'POST',
      url      : self.settings.baseUrl + '/application/',
      data     : formData,
      dataType : 'json',
      success  : function(data) {
        self.resetFormValues(data);
        self.resetJbbox();
        self.drawMap(data, load_data);
        self.drawLegend();
        self.drawScalebar();
        self.showBadPoints();
        self.addBadRecordsViewer();
      }
    });
  }