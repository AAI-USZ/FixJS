function(subView, i) {
        // Look on the instance.
        var keep = subView.keep;

        // Fall back to the options object if it exists.
        if (!_.isBoolean(keep) && subView.options) {
          keep = subView.options.keep;
        }

        // Ensure keep: true is set for any View that has already rendered.
        if (subView.__manager__.hasRendered && !keep) {
          // Ensure the view is removed from the DOM.
          subView.remove();

          // Remove from the array.
          view.splice(i, 1);
        }
      }