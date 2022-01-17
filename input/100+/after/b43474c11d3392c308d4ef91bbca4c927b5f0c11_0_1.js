function(trans, next) {
        //if we aren't a silent level && 
	//this isn't a silent log && 
	//this log's level <= this transport's level
        if(self.levels[self.level] >= 0 &&
           self.levels[args.level] >= 0 &&
           self.levels[args.level] <= self.levels[trans.level]) {
            trans.log(args, function() {
		var a = Array.prototype.slice.call(arguments);
		a.unshift('log');
		self.emit.apply(self, a);
		next();
	    });
        } else {
	    next();
	}
    }