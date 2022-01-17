function(type) {      
      // All the search fields related to Datum
      var datumFieldsViews = this.advancedSearchDatumView.collection;
      var sessionFieldsView = this.advancedSearchSessionView.collection;
      
      // Get all the search criteria
      var searchCriteria = [];
      datumFieldsViews.each(function(datumField) {
        var value = datumField.get("value");
        if (value && value != "") {
          searchCriteria.push(datumField.get("label") + ":" + value);
        }
      });
      sessionFieldsView.each(function(sessionField) {
        var value = sessionField.get("value");
        if (value && value != "") {
          searchCriteria.push(sessionField.get("label") + ":" + value);
        }
      });
      
      // Update the search box with the search string corresponding to the
      // current search criteria
      var queryString = "";
      if (type == "union") {
        queryString = searchCriteria.join(" OR ");
      } else if (type == "intersection") {
        queryString = searchCriteria.join(" AND ");
      }
      
      Utils.debug("Searching for " + queryString);
      return queryString;
    }