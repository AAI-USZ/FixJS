function(input, callback){
		var self = this;
		var output, err;

		//set default options
		marked.setOptions({
			gfm: true,
			pedantic: false,
			sanitize: false 
		});

		try {
			output = marked.call(input.toString());
		} catch(error){
			err = error;	
		}

		return callback(err, output); 
	}