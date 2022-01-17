function () {
    _.bindAll(this);
    this.header = new views.Header({model: this.model});

    $(window).on('scroll', function() {
      if ($(window).scrollTop()>60) {
        $('#post').addClass('sticky-menu');
      } else {
        $('#post').removeClass('sticky-menu');
      }
    });
  }