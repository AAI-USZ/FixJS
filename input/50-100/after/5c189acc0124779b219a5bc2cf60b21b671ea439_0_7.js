function() {
    var self = this;

    $('.arrows').click(function(e) {
      e.preventDefault();
      $('#pan').val($(this).attr("data-pan"));
      self.resetJbbox();
      self.showMap();
      self.trackEvent('arrows', $(this).attr("data-pan"));
    });
  }