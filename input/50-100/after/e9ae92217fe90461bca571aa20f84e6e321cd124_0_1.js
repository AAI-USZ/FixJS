function(err, stdout){

			if (err) {
				console.log("Shoot. Something went wrong. Try running Prey again to see what's going on.")
			} else {
				console.log("Done! You can now close this window.\n");
				console.log("Or if you wish to play around with Prey, try the console mode: \n\n\t $ prey -d console\n")
			}
			process.exit(err ? 1 : 0);
		}