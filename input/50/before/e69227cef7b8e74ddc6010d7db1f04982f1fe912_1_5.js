function() {
      // Remember the status
      this.opened = false;
      // Hide UI of editor
      this.$el.removeClass('show');
      // Show folders in normal mode
      manager.folders.$el.removeClass('deletable');
    }