function() {
      if (this.format == "centreWell") {
        Utils.debug("CORPUS READ FULLSCREEN render: " + this.el);
        if (this.model != undefined) {
          // Display the CorpusReadFullScreenView
          this.setElement($("#corpus-embedded"));
          $(this.el).html(this.templateCentreWell(this.model.toJSON()));
          
          // Display the CommentEditView
          this.commentEditView.el = this.$('.comments');
          this.commentEditView.render();
          
          // Display the DataListsView
         this.dataListsView.el = this.$('.datalists'); 
         this.dataListsView.render();
          
         // Display the SessionsView
         this.sessionsView.el = this.$('.sessions'); 
         this.sessionsView.render();
         
         // Display the PermissionsView
         this.permissionsView.el = this.$('.permissions');
         this.permissionsView.render();
         
          // Display the DatumFieldsView
          this.datumFieldsView.el = this.$('.datum_field_settings');
          this.datumFieldsView.render();
          
          // Display the DatumStatesView
          this.datumStatesView.el = this.$('.datum_state_settings');
          this.datumStatesView.render();
   
        } else {
          Utils.debug("\tCorpus model was undefined.");
        }
      } else if (this.format == "fullscreen") {
        this.setElement($("#corpus-fullscreen"));
        $(this.el).html(this.templateFullscreen(this.model.toJSON()));

        // Display the CommentEditView
        this.commentEditView.el = this.$('.comments');
        this.commentEditView.render();
        
        // Display the DataListsView
        this.dataListsView.el = this.$('.datalists'); 
        this.dataListsView.render();
        
        // Display the SessionsView
        this.sessionsView.el = this.$('.sessions'); //TODO do not use such ambiguous class names, compare this with datum_field_settings below.  there is a highlyily hood that the sesson module will be using the same class name and will overwrite your renders.
        this.sessionsView.render();
        
        // Display the PermissionsView
        this.permissionsView.el = this.$('.permissions');
        this.permissionsView.render();


        // Display the DatumFieldsView
        this.datumFieldsView.el = this.$('.datum_field_settings');
        this.datumFieldsView.render();

        // Display the DatumStatesView
        this.datumStatesView.el = this.$('.datum_state_settings');
        this.datumStatesView.render();

      } else if (this.format == "leftSide"){
        this.setElement($("#corpus-quickview"));
        $(this.el).html(this.templateSummary(this.model.toJSON()));
      }else {
        throw("You have not specified a format that the CorpusEditView can understand.");
      }
        
      return this;
    }