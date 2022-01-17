function() {
      // Clear the current data list
      this.model.attributes = {};
      this.model.set((new DataList()).toJSON());
      this.model.set("datumIds", []);
      this.model.set("corpusname", app.get("corpus").get("corpusname"));
      delete this.model.id;
      
      // Clear the view
      app.get("corpus").get("datalists");
      var coll = this.datumsView.collection;
      while (coll.length > 0) {
        coll.pop();
      }
      
      // Add the new data list to the corpus
      app.get("corpus").get("dataLists").unshift(this.model);
      
      // Display the new data list
      appView.renderReadonlyDataListViews();
      appView.renderEditableDataListViews();
    }