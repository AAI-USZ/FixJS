function() {
    	var key;
      for(key in this.interactions.previousInteractionsTextContainers) {
		if (this.interactions.previousInteractionsTextContainers.hasOwnProperty(key)) {
	  		this.interactions.previousInteractionsTextContainers[key].unhighlightAll();
	    }
      }
	  this.defn.unhighlightAll();
    }