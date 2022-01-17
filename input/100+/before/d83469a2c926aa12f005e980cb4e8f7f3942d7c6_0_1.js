function() {
      // Clear the current data list
      this.model.attributes = {};
      this.model.set((new DataList()).toJSON());
      this.model.set("corpusname", app.get("corpus").get("corpusname"));
      
      // Clear the view
      app.get("corpus").get("datalists");
      var coll = this.datumsView.collection;
      while (coll.length > 0) {
        coll.pop();
      }
      
      // Display the new data list
      appView.renderReadonlyDataListViews();
      appView.renderEditableDataListViews();
    }