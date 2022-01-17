function(evt) {
    var button = evt.button;
    var $element = button.$element;
    var href = $element.attr('href');
    var $viewElement, view, viewStack;
    
    if ($element.hasClass('pp-present-modal')) {
      $viewElement = $(href);
      if ($viewElement.length === 0) return;
      
      view = $viewElement[0].view || new Pushpop.View($viewElement);
      
      viewStack = view.getViewStack();
      if (viewStack) viewStack.present(view);
    }
    
    else if ($element.hasClass('pp-dismiss-modal')) {
      if (href === '#') {
        viewStack = button.getViewStack();
        if (viewStack) viewStack.dismiss();
      } else {
        $viewElement = $(href);
        if ($viewElement.length === 0) return;

        view = $viewElement[0].view || new Pushpop.View($viewElement);

        viewStack = view.getViewStack();      
        if (viewStack) viewStack.dismiss();
      }
    }
  }