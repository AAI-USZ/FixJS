function(error) {
			console.log(error.message);
			console.log(error.stack);
			callback && callback(error);
		}