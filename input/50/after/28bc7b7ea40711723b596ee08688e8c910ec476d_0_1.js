function(e) {
        e.preventDefault();
        this.hide();
        this.trigger('renameColumn');
        return false;
      }