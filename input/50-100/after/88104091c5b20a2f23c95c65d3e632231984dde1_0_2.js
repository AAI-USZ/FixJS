function(manage) {
      // Remove all nested elements.
      this.remove();

      // If a beforeRender function is defined, call it.
      if (_.isFunction(this.beforeRender)) {
        this.beforeRender.call(this, this);
      }

      // Always emit a beforeRender event.
      this.trigger("beforeRender", this);

      // Render!
      return manage(this).render().then(function() {
        // If an afterRender function is defined, call it.
        if (_.isFunction(this.afterRender)) {
          this.afterRender.call(this, this);
        }

        // Always emit an afterRender event.
        this.trigger("afterRender", this);
      });
    }