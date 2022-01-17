function() {
      this.$el.html(this.template(this.options.component.toJSON()));
      return this;
    }