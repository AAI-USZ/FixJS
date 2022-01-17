function(subView, i) {
        if (!subView.keep && (subView.options && !subView.options.keep)) {
          subView.remove();
          // Remove from the array.
          view.splice(i, 1);
        }
      }