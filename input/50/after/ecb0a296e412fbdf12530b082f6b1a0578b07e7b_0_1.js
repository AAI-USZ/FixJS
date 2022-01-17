function() {
          if (view.hasPlaceholderSet()) {
            view.clear();
          }
          view.placeholderSet = false;
          dom.removeClass(view.element, CLASS_NAME);
        }