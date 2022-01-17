function() {
      Utils.debug("In searchUnion");
      
      // Create a query string from the search criteria
      var queryString = this.getQueryString("union");
      
      // Update the search box
      appView.searchView.model.set("searchKeywords", queryString);
      
      // Start the search
      this.search(queryString);
    }