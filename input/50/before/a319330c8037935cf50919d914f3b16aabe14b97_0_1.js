function(evt) {
    if (!self.tapToTop) return;
    
    var activeView = viewStack.getActiveView();
    var scrollView = activeView.element.scrollView;
    if (scrollView && !scrollView.isScrolling) scrollView.scrollToTop(true);
  }