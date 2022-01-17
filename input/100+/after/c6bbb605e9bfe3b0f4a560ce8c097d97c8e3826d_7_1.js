function() {
      Utils.debug("CORPUS render: " + this.el);
      if (this.model == undefined) {
        Utils.debug("\tCorpus model was undefined.");
        return this;
      }
      if (this.format == "leftSide") {
          // Display the CorpusReadView
          this.setElement($("#corpus-quickview"));
          $(this.el).html(this.templateSummary(this.model.toJSON()));
      } else if (this.format == "link") {
        // Display the CorpusGlimpseView, dont set the element
        $(this.el).html(this.templateLink(this.model.toJSON()));
        
      } else if (this.format == "fullscreen"){
        this.setElement($("#corpus-fullscreen")); 
        $(this.el).html(this.templateFullscreen(this.model.toJSON()));
        

        // Display the CommentEditView
        this.commentEditView.el = this.$('.comments');
        this.commentEditView.render();

        
        // Display the UpdatingCollectionView
        //        this.dataListsView.render();
     
        // Display the DatumFieldsView
        this.datumFieldsView.el = this.$('.datum_field_settings');
        this.datumFieldsView.render();
        
        // Display the DatumStatesView
        this.datumStatesView.el = this.$('.datum_state_settings');
        this.datumStatesView.render();

        // Display the DataListsView
        this.dataListsView.el = this.$('.datalists-updating-collection'); 
        this.dataListsView.render();
        
        // Display the SessionsView
        this.sessionsView.el = this.$('.sessions-updating-collection'); //TODO do not use such ambiguous class names, compare this with datum_field_settings below.  there is a highlyily hood that the sesson module will be using the same class name and will overwrite your renders.
        this.sessionsView.render();
        
        // Display the PermissionsView
        this.permissionsView.el = this.$('.permissions-updating-collection');
        this.permissionsView.render();        
        

      } else if (this.format == "centreWell"){
        this.setElement($("#corpus-embedded"));
        $(this.el).html(this.templateCentreWell(this.model.toJSON()));
        
        // Display the UpdatingCollectionView
        //        this.dataListsView.render();

        // Display the CommentEditView
        this.commentEditView.el = this.$('.comments');
        this.commentEditView.render();
        
        // Display the DatumFieldsView
        this.datumFieldsView.el = this.$('.datum_field_settings');
        this.datumFieldsView.render();

        // Display the DatumStatesView
        this.datumStatesView.el = this.$('.datum_state_settings');
        this.datumStatesView.render();

        // Display the DataListsView
        this.dataListsView.el = this.$('.datalists-updating-collection'); 
        this.dataListsView.render();
         
        // Display the SessionsView
        this.sessionsView.el = this.$('.sessions-updating-collection'); 
        this.sessionsView.render();
        
        // Display the PermissionsView
        this.permissionsView.el = this.$('.permissions-updating-collection');
        this.permissionsView.render();


      }
      

      return this;
    }