function(view, name) {
      // If the view is an array put all views into insert mode
      if (_.isArray(view)) {
        return _.each(view, function(view) {
          this.setView(name, view, true);
        }, this);
      }

      // Assign each view using the view function
      this.setView(name, view);
    }