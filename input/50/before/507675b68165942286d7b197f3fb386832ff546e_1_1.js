function() {
        this.$el.html(Mustache.render(this.template, this.model.toJSON()));
        return this;
      }