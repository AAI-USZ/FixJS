function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
      }