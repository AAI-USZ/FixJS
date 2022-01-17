function() {
          if (view.isEmpty()) {
            view.setValue(placeholderText);
            dom.addClass(view.element, CLASS_NAME);
          }
        }