function(args) {
    var result = Empty.EMPTY;
    var i;
    for(i = args.length-1; i >= 0; i--) {
	result = Cons.makeInstance(args[i], result);
    }
    return result;
}