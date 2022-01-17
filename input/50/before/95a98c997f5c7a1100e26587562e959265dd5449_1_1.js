function SignalTree () {
        return Object.defineProperties(this, {
            _base : {
                value : new Topic(),
                writable : true
            }
        })
    }