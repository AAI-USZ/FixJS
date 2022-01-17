function() {
      menu.show().position({
        my: 'left top',
        at: 'left bottom',
        of: this,
        collision: 'fit fit'
      }).hide().slideDown().focus();
      return false;
    }