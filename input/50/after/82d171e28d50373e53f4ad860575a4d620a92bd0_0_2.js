function(error) {
			if (error) {
				console.log(error.message);
				console.log(error.stack);				
				console.log(util.inspect(error));
				return;
			}			
		}