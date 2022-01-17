function () {
      //set internal state
      if (self.starredFilteringEnabled) {
         self.starredFilteringEnabled = false;
      }
      else {
         self.starredFilteringEnabled = true;
      }
      //change checkbox state
      setCheckboxState($(this), self.starredFilteringEnabled);      
      //trigger filtering if required
      $(document).trigger('refreshConversationList');     
   }