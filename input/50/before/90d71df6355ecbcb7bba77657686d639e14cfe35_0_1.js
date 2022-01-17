function() {
      menu.show().position({
        my: 'left top',
        at: 'left bottom',
        of: this,
        colision: 'fit flip'
      }).hide().slideDown().focus();
      return false;
    }