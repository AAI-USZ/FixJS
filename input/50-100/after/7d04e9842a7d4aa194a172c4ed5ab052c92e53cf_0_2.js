function() {
      this.wrap.find('.edit').bind('click', this.toggleEditMod);
      this.wrap.find('button').bind('click', this.handleSave);
      return this.wrap.find('.share').bind('click', this.toggleShare);
    }