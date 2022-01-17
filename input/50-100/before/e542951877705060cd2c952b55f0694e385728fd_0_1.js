function() {
    	var defaults = this.createDefault(),
          data = this.get('data');
    	console.log('defaults:', defaults);
      console.log('data:', data);

      if(data) {
    	  data = JSON.parse(data);
    	  delete data.instrument;
    	  delete data.state;
    	  delete data.time_signature;
    	  
        //TODO: Arrays will not properly extend
        //data.positions = $.extend(true, data.positions, defaults.positions);
        //this.adjustBars(data);
        this.set(data);
    	}
    	this.set({data: {}});

    }