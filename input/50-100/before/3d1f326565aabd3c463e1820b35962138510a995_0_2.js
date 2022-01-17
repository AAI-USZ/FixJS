function(/*Anything*/ dst, /*Anything*/ src, /*dojox.mvc.equalsOptions*/ options){
		// summary:
		//		Compares two dojo.Stateful objects, by diving into the leaves.
		// description:
		//		Recursively iterates and compares stateful values.
		// dst: Anything
		//		The stateful value to compare with.
		// src: Anything
		//		The stateful value to compare with.
		// options: dojox.mvc.equalsOptions
		//		The object that defines how two stateful values are compared.
		// returns: Boolean
		//		True if dst equals to src, false otherwise.

		var options = options || equals, types = [options.getType(dst), options.getType(src)];
		return types[0] != types[1] ? false : options["equals" + types[0].replace(/^[a-z]/, function(c){ return c.toUpperCase(); })](dst, src); // Boolean
	}