function(err, db) {
        // Code for get_datum_field/get_datum_fields
        //
        // function(doc) {
        //   if ((doc.datumFields) && (doc.session)) {
        //     var obj = {};
        //     for (i = 0; i < doc.datumFields.length; i++) {
        //       if (doc.datumFields[i].value) {
        //         obj[doc.datumFields[i].label] = doc.datumFields[i].value;
        //       }
        //     }
        //     if (doc.session.sessionFields) {
        //       for (j = 0; j < doc.session.sessionFields.length; j++) {
        //         if (doc.session.sessionFields[j].value) {
        //           obj[doc.session.sessionFields[j].label] = doc.doc.session.sessionFields[j].value;
        //         }
        //       }
        //     }
        //     emit(obj, doc._id);
        //   }
        // }
        db.query("get_datum_field/get_datum_fields", {reduce: false}, function(err, response) {
          var matchIds = [];
          
          if (!err) {
            // Process the given query string into tokens
            var queryTokens = self.processQueryString(queryString);
            
            // Go through all the rows of results
            for (i in response.rows) {
              // Determine if this datum matches the first search criteria
              var thisDatumIsIn = self.matchesSingleCriteria(response.rows[i].key, queryTokens[0]);
              
              // Progressively determine whether the datum still matches based on
              // subsequent search criteria
              for (j = 1; j < queryTokens.length; j += 2) {
                if (queryTokens[j] == "AND") {
                  // Short circuit: if it's already false then it continues to be false
                  if (!thisDatumIsIn) {
                    break;
                  }
                  
                  // Do an intersection
                  thisDatumIsIn = thisDatumIsIn && self.matchesSingleCriteria(response.rows[i].key, queryTokens[j+1]);
                } else {
                  // Do a union
                  thisDatumIsIn = thisDatumIsIn || self.matchesSingleCriteria(response.rows[i].key, queryTokens[j+1]);
                }
              }
              
              // If the row's datum matches the given query string
              if (thisDatumIsIn) {
                // Keep its datum's ID, which is the value
                matchIds.push(response.rows[i].value);
              }
            }
          }
          
          callback(matchIds);
        });
      }