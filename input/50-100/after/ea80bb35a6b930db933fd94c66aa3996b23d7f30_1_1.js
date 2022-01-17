function(containerView){
    var container;
    if ("$itemViewContainer" in containerView){
      container = containerView.$itemViewContainer;
    } else {
      if (containerView.itemViewContainer){
        container = containerView.$(_.result(containerView, "itemViewContainer"));

        if (container.length <= 0) {
          var err = new Error("Missing `itemViewContainer`");
          err.name = "ItemViewContainerMissingError";
          throw err;
        }
      } else {
        container = containerView.$el;
      }
      containerView.$itemViewContainer = container;
    }
    return container;
  }