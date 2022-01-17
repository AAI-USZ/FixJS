function() {
  var $window = $(window['addEventListener'] ? window : document.body);
  
  // Handle actions for buttons set up to automatically present/dismiss modals.
  $window.delegate('.pp-button.pp-present-modal, .pp-button.pp-dismiss-modal', Pushpop.Button.EventType.DidTriggerAction, function(evt) {
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
  });
  
  // Handle clicks for anchor links set up to automatically present/dismiss modals.
  $window.delegate('a.pp-present-modal, a.pp-dismiss-modal', 'click', function(evt) {
    var $element = $(this);
    if ($element.hasClass('pp-button')) return;
    
    evt.preventDefault();
    
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
        viewStack = Pushpop.getViewStackForElement($element);
        if (viewStack) viewStack.dismiss();
      } else {
        $viewElement = $(href);
        if ($viewElement.length === 0) return;

        view = $viewElement[0].view || new Pushpop.View($viewElement);

        viewStack = view.getViewStack();      
        if (viewStack) viewStack.dismiss();
      }
    }
  });
}