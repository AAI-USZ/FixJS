function(e) {
        e.preventdefault();
        this.hide();
        this.trigger('renameColumn');
        return false;
      }