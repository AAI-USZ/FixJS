function() {
    var $window = $(window)
      , distFromTop = $window.height() + $window.scrollTop()
      , distFromBottom = $(document).height() - distFromTop
      , bufferPx = this.scrollOffset;

    if(distFromBottom < bufferPx) {
      this.trigger("loadMore")
    }
  }