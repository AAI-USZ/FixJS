function() {
          if (view.hasPlaceholderSet()) {
            view.clear();
          }
          dom.removeClass(view.element, CLASS_NAME);
        }