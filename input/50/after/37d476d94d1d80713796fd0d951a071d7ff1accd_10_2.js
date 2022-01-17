function() {
      Utils.debug("In searchIntersection");
      
      // Create a query string from the search criteria
      var queryString = this.getQueryString("intersection");
      
      // Update the search box
      appView.searchTopView.model.set("searchKeywords", queryString);
      
      // Start the search
      this.search(queryString);
    }