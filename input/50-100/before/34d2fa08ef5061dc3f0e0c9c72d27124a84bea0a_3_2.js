function(){
		if(!this.debug) return;
		
		var args =  Array.prototype.slice.call(arguments);
		args.unshift("["+this.identifier+"]");

		window.console.log(args.join().replace(",",""));
	}