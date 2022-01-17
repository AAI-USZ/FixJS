function() { 
	  var options = this.data();
	  if (options['logarithmic'] == 1)
	  	options['logarithmic'] = 0;
	  else {
	  	options['logarithmic'] = 1;
	  	options['zero'] = 0;
	  }
	  this.data(options);
      return this;
    }