function(containerView, itemViewContainer){
    var container;
    if ("$itemViewContainer" in containerView){
      container = containerView.$itemViewContainer;
    } else {
      if (containerView.itemViewContainer){
        container = containerView.$(itemViewContainer);
      } else {
        container = containerView.$el;
      }
      containerView.$itemViewContainer = container;
    }
    return container;
  }