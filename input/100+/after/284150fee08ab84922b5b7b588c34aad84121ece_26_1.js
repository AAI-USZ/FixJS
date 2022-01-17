function(name, method, noCast){
        if(typeof method !== 'function'){
            // Assume string with name of method
            // This allows instance-overriding methods,
            //  because the method's value is lazily captured.
            method = def.methodCaller('' + method);
        }
        
        var me = this;
        this.pvMark.intercept(
                name,
                function(fun, args){
                    var prevExtFun = me._extFun, prevExtArgs = me._extArgs;
                    me._extFun = fun;
                    me._extArgs = args;
                    try {
                        return method.apply(me, args);
                    } finally{
                        me._extFun = prevExtFun;
                        me._extArgs = prevExtArgs;
                    }
                },
                this._getExtension(name),
                noCast);
        
        return this;
    }