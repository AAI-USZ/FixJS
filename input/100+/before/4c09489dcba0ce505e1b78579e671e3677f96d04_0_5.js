function(evt) {
    evt.preventDefault();
    
    var $this = $(this);
    var href = $this.attr('href');
    var $viewElement = $(href);
    
    var view = $viewElement[0];
    if (view) view = view.view || new Pushpop.View($viewElement);
    
    var viewStack = view.getViewStack();    
    if (viewStack) viewStack.present();
  }