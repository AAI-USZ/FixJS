function(corpusName, dataListId) {
      Utils.debug("In showFullscreenDataList: " + corpusName + " *** "
          + dataListId);

      this.hideEverything();
      $("#data-list-fullscreen").show();      
    }