function plus(args) {
    	var left = args[0],
    	    right = args[1];
    	
        if (args.length != 2) {
            throw new Error("wrong number of arguments: needed 2, got " + args.length);
        }

        if (left.type !== 'number' || right.type !== 'number') {
            throw new Error("primitive + requires two numbers (got " + left.type + ", " + right.type + ")");
        }
        return Data.Number(left.value + right.value);
    }