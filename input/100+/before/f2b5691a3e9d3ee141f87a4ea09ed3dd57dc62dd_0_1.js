function(view) {
      var self = this;
      var data = this.data();

      if(this.sqlView) {
        this.sqlView.unbind(null, null, this);
        this.sqlView.unbind(null, null, this._data);
      }

      this.sqlView = view;

      if(view) {
        this._data.unlinkFromSchema();
        this.sqlView.bind('reset', this._renderRows, this);
        this.sqlView.bind('add', this.addRow, this);
        view.bind('reset', function() {
          //data.reset(view.models);
          self.set({ schema: view.schemaFromData()});
        }, this);
        // swicth source data
        this.dataModel = this.sqlView;
      } else {
        this._data.linkToSchema();
        this.dataModel = this._data;
        // get the original schema
        this.fetch();
      }
      this.trigger('change:sqlView', this);
    }