function() {
    if (this.options.createScroller) {
      if (this.$wrapper.children().length) {
        // Wrap the content with a div  
        this.$wrapper.children().wrapAll("<div/>");    
        }
      else {
        // Create an empty div for content and wrap with a div
        this.$wrapper.append("<div><div></div></div>"); 
        }
      }
    }