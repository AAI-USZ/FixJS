function() {
      var nextNumberOfDatum = app.get("authentication").get("userPrivate").get("prefs").get("numVisibleDatum");
        
      // Get the current Corpus' Datum based on their date entered
      var self = this;
      (new Datum({"corpusname": app.get("corpus").get("corpusname")})).getAllDatumIdsByDate(function(rows) {
        // If there are no Datum in the current Corpus
        if ((rows == null) || (rows.length <= 0)) {
          // Remove all currently displayed Datums
          for (var i = 0; i < self.model.length; i++) {
            self.model.pop();
          }
            
          // Add a single, blank Datum
          self.prependDatum(new Datum({
            datumFields : app.get("corpus").get("datumFields").clone(),
            datumStates : app.get("corpus").get("datumStates").clone(),
            corpusname : app.get("corpus").get("corpusname")
          }));
        } else {
          // If the user has increased the number of Datum to display in the container
          if (nextNumberOfDatum > self.model.length) {
            for (var i = self.model.length; i < nextNumberOfDatum; i++) {
              // Add the next most recent Datum from the Corpus to the bottom of the stack, if there is one
              if (rows[rows.length - i - 1]) {
                var d = new Datum();
                d.set(d.parse(rows[rows.length - i - 1].value));
                self.model.add(d);
              }
            }
          // If the user has decreased the number of Datum to display in the container
          } else if (nextNumberOfDatum < self.model.length) {
            // Pop the excess Datum from the bottom of the stack
            for (var i = nextNumberOfDatum; i < self.model.length; i++) {
              self.model.pop();
            }
          }
        }
      })
    }