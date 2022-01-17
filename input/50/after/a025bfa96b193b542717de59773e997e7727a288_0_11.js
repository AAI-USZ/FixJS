function $_prototype_detach (async, fn) {
		  return this.each(function detach_internal () {
			  detach(this, async, fn);
		  });
	  }