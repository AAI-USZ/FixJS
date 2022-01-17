function(){
      //If the model has changed, then change the views of the internal models because they are no longer connected with this corpus's models
      this.changeViewsOfInternalModels();
      window.appView.renderEditableCorpusViews();
    }