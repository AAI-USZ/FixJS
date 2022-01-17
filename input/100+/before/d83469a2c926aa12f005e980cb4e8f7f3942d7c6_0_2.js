function(datumId, addToTop) {
      if (addToTop) {
        // Add it to the front of the model's list of datum ids
        this.model.get("datumIds").unshift(datumId);
        
        // Fetch its model from the database
        var d = new Datum({
          corpusname : window.app.get("corpus").get("corpusname")
        });
        d.id = datumId;
        var self = this;
        d.changeCorpus(window.app.get("corpus").get("corpusname"), function(){
          d.fetch({
            success : function(model, response) {
              // Render at the top
              self.datumsView.collection.add(model, {at:0});
            }
          });
        });
      } else {
        // Add it to the back of the model's list of datum ids
        this.model.get("datumIds").push(datumId);
        
        // If there is room on the current page
        var numDatumCurrentlyDisplayed = this.datumsView.collection.length
        if ((numDatumCurrentlyDisplayed == 0) || (numDatumCurrentlyDisplayed % this.perPage != 0)) {
          // Fetch its model from the database
            var d = new Datum({
              corpusname : window.app.get("corpus").get("corpusname")
            });
            d.id = datumId;
            var self = this;
            d.changeCorpus(window.app.get("corpus").get("corpusname"), function(){
              d.fetch({
                success : function(model, response) {
                  // If there is still room on the current page
                  var numDatumCurrentlyDisplayed = self.datumsView.collection.length
                  if ((numDatumCurrentlyDisplayed == 0) || (numDatumCurrentlyDisplayed % self.perPage != 0)) {
                    // Render at the bottom
                    self.datumsView.collection.add(model);
                  }
                }
              });
            });
        }
      }
      
      // Display the updated data list
      appView.renderReadonlyDataListViews();
      appView.renderEditableDataListViews();
    }