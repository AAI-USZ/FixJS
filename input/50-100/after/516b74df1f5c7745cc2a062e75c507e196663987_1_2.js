function() {
      this.model.bind('reset', this._addAll, this);
      this.model.bind('add', this._addTable, this);
      this.model.bind('destroy', this._updateListHeader, this);
    }