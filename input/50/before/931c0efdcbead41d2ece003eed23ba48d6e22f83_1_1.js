function() {
      this.table = this.get('table');
      if(!this.table) {
        throw new Exception("you should specify a table model");
      }
      this.unset('table', { silent: true });
    }