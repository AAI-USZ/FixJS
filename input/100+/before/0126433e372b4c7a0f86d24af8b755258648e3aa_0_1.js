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
        
        this.insertUnicodeView.render();
        
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
        
        var self = this;
        //dont do inputs leave them out because the import uses inputs, and none of the fieds taht will recieve uncide are inputs
//        $("input").each(function(index){
//          index.addEventListener('drop', window.appView.dragUnicodeToField, false);
//          index.addEventListener('dragover', window.appView.handleDragOver, false);
//        });
        $("textarea").each(function(index){
          this.addEventListener('drop', window.appView.dragUnicodeToField, false);
          this.addEventListener('dragover', window.appView.handleDragOver, false);
        });
        
      } else {
        Utils.debug("\tApp model is not defined");
      }
      
      return this;
    }