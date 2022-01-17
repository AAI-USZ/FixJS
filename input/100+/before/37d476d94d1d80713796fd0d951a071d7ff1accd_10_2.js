function() {
      Utils.debug("SEARCH render: " + this.el);
      
      if (this.format == "fullscreen") {
        // Display the SearchView
        this.setElement($("#search-fullscreen"));
        $(this.el).html(this.advancedTemplate(this.model.toJSON()));
        

        this.advancedSearchDatumView.el = this.$('.advanced_search_datum');
        this.advancedSearchDatumView.render();

        this.advancedSearchSessionView.el = this.$('.advanced_search_session');
        this.advancedSearchSessionView.render();

        
        Utils.debug("\trendering search: "+ this.model.get("searchKeywords"));
      } else if (this.format == "top") {
        // Display the SearchView
        this.setElement($("#search-top"));
        $(this.el).html(this.topTemplate(this.model.toJSON()));
      }
      
      return this;
    }