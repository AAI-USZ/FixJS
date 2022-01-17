function(error) {
			if (error) {
				console.log(error.message);
				console.log(error.stack);				
				console.log(util.inspect(error, false, 3, true));
				return;
			}			
		}