function(rows) {
        // If there are no Datum in the current Corpus
        if ((rows == null) || (rows.length <= 0)) {
          // Remove all currently displayed Datums
          for (var i = 0; i < previousNumberOfDatum; i++) {
            self.model.pop();
          }
        } else {
          // If the user has increased the number of Datum to display in the container
          if (nextNumberOfDatum > previousNumberOfDatum) {
            for (var i = previousNumberOfDatum; i < nextNumberOfDatum; i++) {
              // Add the next most recent Datum from the Corpus to the bottom of the stack, if there is one
if (rows[rows.length - i - 1]) {
                var d = new Datum();
                d.set(d.parse(rows[rows.length - i - 1].value));
                self.model.add(d);
              }
            }
          // If the user has decrease the number of Datum to display in the container
          } else if (nextNumberOfDatum < previousNumberOfDatum) {
            // Pop the excess Datum from the bottom of the stack
            for (var i = nextNumberOfDatum; i < previousNumberOfDatum; i++) {
              self.model.pop();
            }
          }
        }
      }