function () {
    _.bindAll(this);
    var that = this;
    this.header = new views.Header({model: this.model});

    // No longer needed
    // $(window).on('scroll', function() {
    //   if ($(window).scrollTop()>60) {
    //     $('#post').addClass('sticky-menu');
    //   } else {
    //     $('#post').removeClass('sticky-menu');
    //   }
    // });

    function calculateLayout() {
      if (that.mainView.refreshCodeMirror) {
        that.mainView.refreshCodeMirror();
      }
    }

    var lazyLayout = _.debounce(calculateLayout, 300);
    $(window).resize(lazyLayout);
  }