function(){

		var child = require('child_process').spawn('prey');

		child.on('exit', function(code){
			if(code == 0){
				console.log("Done! You can now close this window.\n");
				console.log("Or if you wish to play around with Prey, try the console mode: \n\n\t $ prey -d console\n")
			} else {
				console.log("Shoot. Something went wrong. Try running Prey again to see what's going on.")
			}
			process.exit(code);
		})

	}