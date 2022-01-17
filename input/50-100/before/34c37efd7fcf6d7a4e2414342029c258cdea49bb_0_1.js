function (what, func) {

		ASSERT(core);



		console.log("Printing " + what + ":");

		for( var name in nodes ) {

			console.log(name + ":", func(nodes[name]));

		}

		console.log();

	}