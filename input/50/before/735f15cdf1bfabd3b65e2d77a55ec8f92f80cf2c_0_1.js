function(){
		this.inherited(arguments);

		// Back-compat for when constructor specifies indeterminate or progress, rather than value.   Remove for 2.0.
		if(!("value" in this.params)){
			this.value = this.indeterminate ? Infinity : this.progress;
		}
	}