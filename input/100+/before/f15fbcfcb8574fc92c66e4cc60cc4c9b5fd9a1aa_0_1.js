function cons(args) {
    	var elem = args[0],
    	    list = args[1];
    	
        if (list.type !== 'list') {
            throw new Error("second arguments to 'cons' must be list (got " + list.type + ")");
        }
        
        if (args.length != 2) {
            throw new Error("wrong number of arguments: needed 2, got " + args.length);
        }

        var newList = [elem];
        for (var i = 0; i < list.value.length; i++) {
            newList.push(list.value[i]);
        }

        return Data.List(newList);
    }