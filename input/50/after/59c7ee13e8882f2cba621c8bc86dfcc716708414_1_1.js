function() {
      this.$el.html(this.template(this.model.toJSON()));
      $('#nav-menu').html(this.el);
    }