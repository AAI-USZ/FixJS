function() {
    var $window = $(window)
      , distFromTop = $window.height() + $window.scrollTop()
      , distFromBottom = $(document).height() - distFromTop
      , bufferPx = 2000;

    if(distFromBottom < bufferPx) {
      this.trigger("loadMore")
    }
  }