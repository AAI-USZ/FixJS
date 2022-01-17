function() {
      
      // Show the cell in either its covered or exposed state.
      var isCovered = this.model.get("covered");
      this.$el.toggleClass("covered", isCovered);
      this.$el.toggleClass("exposed", !isCovered);
      
      var isVisible = this.model.get("visible");
      var isFlagged = this.model.get("flagged");
      
      this.$el.toggleClass("flagged", isFlagged);

      if (isFlagged && !this.model.hasMine() && isVisible) {
        
         // Show a crossed out mine if the tile is incorrectly flagged as mine
        // and is visible (being shown to the user).
        this.$el.toggleClass("crossed");
      }

      // Toggle the mine display class if a mine cell is uncovered 
      // or one of the mines you didn't mark.
      if (!isCovered ||
          (isCovered && isVisible && !isFlagged) ) {
        this.$el.toggleClass("mine", this.model.hasMine() );
      }
      
      // Show the tile with the number if the cell is uncovered and not empty. 
      if ( !isCovered && !this.model.empty() ) {
        
        this.$el.text(this.model.get("value"));
      }
      
      
      return this;
    }