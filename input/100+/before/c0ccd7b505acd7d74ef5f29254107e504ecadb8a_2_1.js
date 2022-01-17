function() {
      if (this.format == "link") {
        // Display the Data List
        this.setElement($("#data-list-link"));
        $(this.el).html(this.linkTemplate(this.model.toJSON()));
      } else if (this.format == "leftSide") {
        this.setElement($("#data-list-embedded"));
        $(this.el).html(this.embeddedTemplate(this.model.toJSON()));
        
        // Display the DatumFieldsView
        this.datumsView.el = this.$(".data_list_content");
        this.datumsView.render();
          
        // Display the pagination footer
        this.renderUpdatedPagination();
      } else if (this.format == "fullscreen") {
        // Display the Data List
        this.setElement($("#data-list-fullscreen"));
        $(this.el).html(this.fullscreenTemplate(this.model.toJSON()));
        
        // Display the DatumFieldsView
        this.datumsView.el = this.$(".data_list_content");
        this.datumsView.render();
        
        // Display the pagination footer
        this.renderUpdatedPagination();
      } else if(this.format == "middle") {
        this.setElement($("#new-data-list-embedded"));
        $(this.el).html(this.embeddedTemplate(this.model.toJSON()));
        
        // Display the DatumFieldsView
        this.datumsView.el = this.$(".data_list_content");
        this.datumsView.render();
        
        // Display the pagination footer
        this.renderUpdatedPagination();
      }
      
      return this;
    }