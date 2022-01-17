function(event) {
      event.preventDefault();
      var $target = $(event.target);

      // make sure that this isn't propagation
      if ($target.is('a')) {
        this.$el.siblings().removeClass('active');
        this.$el.addClass('active');
        this.options.screens.setActiveProject(this.model.id);
        $addScreen.show();
      }
    }