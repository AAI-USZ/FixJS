function() {
      // Remember the status
      this.opened = false;
      // Hide UI of editor
      this.$el.removeClass('show');
      // Removed clicked
      $('.clicked').removeClass('clicked');
      // Show folders in normal mode
      manager.folders.$el.removeClass('deletable');
    }