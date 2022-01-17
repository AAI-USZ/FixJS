function() {
      Utils.debug("APP render: " + this.el);
      if (this.model != undefined) {
        // Display the AppView
        this.setElement($("#app_view"));
        $(this.el).html(this.template(this.model.toJSON()));
        
        // Display the Corpus Views
        this.corpusEditLeftSideView.render();
        this.corpusReadLeftSideView.render();
        this.corpusEditEmbeddedView.render();
        this.corpusReadEmbeddedView.render();
        this.corpusEditFullscreenView.render();
        this.corpusReadFullscreenView.render();
        
        // Display the ExportView
        this.exportView.render();
        
        // Display the User Views
        this.fullScreenEditUserView.render();
        this.fullScreenReadUserView.render();
        this.modalEditUserView.render();
        this.modalReadUserView.render();
        
        // Display the Datum Container Views
        this.renderReadonlyDatumsViews("centreWell");
        this.renderEditableDatumsViews("centreWell");
        
        // Display the Search Views
        this.searchTopView.render();
        this.searchFullscreenView.render();
        this.searchEmbeddedView.render();
        
        // Display the AuthView
        this.authView.render();
        
        // Display the Session Views
        this.sessionEditLeftSideView.render();
        this.sessionReadLeftSideView.render();
        this.sessionEditEmbeddedView.render();
        this.sessionReadEmbeddedView.render();
        this.sessionEditFullscreenView.render();
        this.sessionReadFullscreenView.render();
        this.sessionModalView.render();
        
        // Display the UserPreferenceEditView
        this.userPreferenceView.render();
        
        //Display ActivityFeedView
        this.activityFeedView.render();
        
        this.insertUnicodesView.render();
        
        // Display HotKeysView
        this.hotkeyEditView.render();//.showModal();

        // Display Data List Views 
        this.dataListEditMiddleView.render();
        this.dataListEditLeftSideView.render();
        this.dataListEditFullscreenView.render();
        this.dataListReadLeftSideView.render();
        this.dataListReadFullscreenView.render();
        this.dataListReadMiddleView.render();

         
        // Display the ImportEditView
        this.importView.render();
      } else {
        Alert("\tApp model is not defined, refresh your browser."+ Utils.contactUs);
      }
      
      return this;
    }