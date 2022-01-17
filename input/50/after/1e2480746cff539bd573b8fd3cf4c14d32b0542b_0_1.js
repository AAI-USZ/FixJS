function curryIdentity(fn) {

    return function() {

        var args = [].slice.call(arguments);

        args.splice(0,0,this);

        return fn.apply(this, args);

    }

}