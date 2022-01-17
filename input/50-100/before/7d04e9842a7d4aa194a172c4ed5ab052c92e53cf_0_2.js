function() {
      this.wrap.find('.edit').bind('click', this.toggleEditMod);
      return this.wrap.find('button').bind('click', this.handleSave);
    }